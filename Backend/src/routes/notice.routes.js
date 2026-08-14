import { Router } from "express";
import {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
} from "../controllers/notice.controller.js";
import { verifyjwt} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ─── Public routes ──────────────────────────────────────────────────────
router.route("/").get(getAllNotices);
router.route("/:id").get(getNoticeById);

// ─── Protected routes ───────────────────────────────────────────────────
router.route("/").post(verifyjwt, upload.single("attachment"), createNotice);
router.route("/:id").patch(verifyjwt, upload.single("attachment"), updateNotice);
router.route("/:id").delete(verifyjwt, deleteNotice);

export default router;