import { Router } from "express";
import {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    addPhotosToAlbum,
    deletePhoto,
} from "../controllers/gallery.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ─── Public ─────────────────────────────────────────────
router.get("/albums", getAllAlbums);
router.get("/albums/:id", getAlbumById);

// ─── Auth required (any admin) ─────────────────────────
router.post("/albums", verifyjwt, upload.single("coverImage"), createAlbum);
router.patch("/albums/:id", verifyjwt, upload.single("coverImage"), updateAlbum);
router.delete("/albums/:id", verifyjwt, deleteAlbum);

router.post("/albums/:id/photos", verifyjwt, upload.array("photos", 20), addPhotosToAlbum);
router.delete("/photos/:photoId", verifyjwt, deletePhoto);

export default router;