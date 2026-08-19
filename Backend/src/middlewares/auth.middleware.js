import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyjwt = asyncHandler(async (req, res, next) => {
    
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Access token not received");
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id)
            .select("-refreshToken");

        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;

        console.log("✅ USER AUTHENTICATED:", user.username);

        next();
    } catch (error) {
        console.log("❌ JWT ERROR:", error.message);

        throw new ApiError(
            401,
            error?.message || "Invalid Access Token"
        );
    }
});