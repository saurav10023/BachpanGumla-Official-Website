import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Login
 * Public
 * POST /api/auth/login
 * NOTE: does NOT create users. Account must already exist
 * (created by a super admin, or seeded once via script).
 */
const login = asyncHandler(async (req, res) => {
    let { username, password } = req.body;
    username = username?.trim().toLowerCase();

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) throw new ApiError(401, "Invalid username or password");

    if (!user.isActive) throw new ApiError(403, "This account has been disabled");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid username or password");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id); // password excluded by default (select:false)

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, loggedInUser, "Logged in successfully"));
});

/**
 * Logout
 * Auth required
 * POST /api/auth/logout
 */
const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Refresh Access Token
 * Public (relies on refresh token cookie)
 * POST /api/auth/refresh-token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

    let decodedToken;
    try {
        decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decodedToken._id).select("+refreshToken");

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or already used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed successfully"));
});

// ─── Self (any logged-in admin) ────────────────────────────────────────────────

/**
 * Get current logged-in user's own profile
 * Auth required
 * GET /api/users/me
 */
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

/**
 * Change own password
 * Auth required
 * PATCH /api/users/change-password
 */
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old and new password are required");
    }
    if (newPassword.length < 8) {
        throw new ApiError(400, "New password must be at least 8 characters");
    }

    const user = await User.findById(req.user._id).select("+password");

    const isCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isCorrect) throw new ApiError(401, "Old password is incorrect");

    user.password = newPassword; // pre-save hook re-hashes
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Update own display name
 * Auth required
 * PATCH /api/users/update-details
 */
const updateOwnDetails = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { name } },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Details updated successfully"));
});

// ─── Super Admin only: manage other admins ────────────────────────────────────

/**
 * Create a new admin
 * Super admin only
 * POST /api/users/create-admin
 */
const createAdmin = asyncHandler(async (req, res) => {
    if (req.user.userType !== "super admin") {
        throw new ApiError(403, "Only super admin can create admins");
    }

    let { username, password, name } = req.body;
    username = username?.trim().toLowerCase();

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }
    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters");
    }

    const existing = await User.findOne({ username });
    if (existing) throw new ApiError(409, "Username already taken");

    const newAdmin = await User.create({
        username,
        password,
        name,
        userType: "admin",
        createdBy: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, { username: newAdmin.username, name: newAdmin.name }, "Admin created successfully"));
});

/**
 * List all admins
 * Super admin only
 * GET /api/users/all-admins
 */
const getAllAdmins = asyncHandler(async (req, res) => {
    if (req.user.userType !== "super admin") {
        throw new ApiError(403, "Only super admin can view admin list");
    }

    const admins = await User.find({ userType: "admin" })
        .select("username name isActive createdAt createdBy")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, admins, "Admins fetched successfully"));
});

/**
 * Enable / disable an admin (soft, reversible — no delete needed)
 * Super admin only
 * PATCH /api/users/:id/toggle-active
 */
const toggleAdminActive = asyncHandler(async (req, res) => {
    if (req.user.userType !== "super admin") {
        throw new ApiError(403, "Only super admin can change admin status");
    }

    const target = await User.findById(req.params.id);
    if (!target) throw new ApiError(404, "Admin not found");
    if (target.userType === "super admin") {
        throw new ApiError(403, "Cannot deactivate a super admin");
    }

    target.isActive = !target.isActive;
    await target.save({ validateBeforeSave: false });

    // Force logout if being deactivated
    if (!target.isActive) {
        target.refreshToken = "";
        await target.save({ validateBeforeSave: false });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { username: target.username, isActive: target.isActive }, "Admin status updated"));
});

/**
 * Reset an admin's password (super admin sets a temp password for them)
 * Super admin only
 * PATCH /api/users/:id/reset-password
 */
const resetAdminPassword = asyncHandler(async (req, res) => {
    if (req.user.userType !== "super admin") {
        throw new ApiError(403, "Only super admin can reset passwords");
    }

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
        throw new ApiError(400, "New password must be at least 8 characters");
    }

    const target = await User.findById(req.params.id);
    if (!target) throw new ApiError(404, "Admin not found");
    if (target.userType === "super admin" && String(target._id) !== String(req.user._id)) {
        throw new ApiError(403, "Cannot reset another super admin's password");
    }

    target.password = newPassword;
    target.refreshToken = ""; // force re-login everywhere
    await target.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successfully"));
});

export {
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    changePassword,
    updateOwnDetails,
    createAdmin,
    getAllAdmins,
    toggleAdminActive,
    resetAdminPassword,
};