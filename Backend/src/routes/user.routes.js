import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";

import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

// ─── Public ───────────────────────────────────────────────

router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// ─── Authenticated (any admin) ─────────────────────────────

router.post("/logout", verifyjwt, logout);
router.get("/me", verifyjwt, getCurrentUser);
router.patch("/change-password", verifyjwt, changePassword);
router.patch("/update-details", verifyjwt, updateOwnDetails);

// ─── Super Admin only (user management) ────────────────────
// verifyjwt attaches req.user; the super-admin role check
// itself stays inside each controller function.

router.post("/create-admin", verifyjwt, createAdmin);
router.get("/all-admins", verifyjwt, getAllAdmins);
router.patch("/:id/toggle-active", verifyjwt, toggleAdminActive);
router.patch("/:id/reset-password", verifyjwt, resetAdminPassword);

export default router;