import { asyncHandler } from "../utils/asyncHandler.js";
import Album from "../models/album.model.js";
import Photo from "../models/photo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

// ─── Albums ───────────────────────────────────────────────────────────────

/**
 * Create album (optionally with a cover image)
 * Auth required
 * POST /api/gallery/albums
 */
const createAlbum = asyncHandler(async (req, res) => {
    const { title, description, eventDate } = req.body;

    if (!title?.trim()) throw new ApiError(400, "Album title is required");

    let coverImageUrl = null;
    let coverImagePublicId = null;

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.path);
        if (!result) throw new ApiError(500, "Cover image upload failed");
        coverImageUrl = result.secure_url;
        coverImagePublicId = result.public_id;
    }

    const album = await Album.create({
        title,
        description,
        eventDate: eventDate || null,
        coverImageUrl,
        coverImagePublicId,
        createdBy: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, album, "Album created successfully"));
});

/**
 * Get all albums (public) — cover + metadata only, not full photo list
 * GET /api/gallery/albums
 */
const getAllAlbums = asyncHandler(async (req, res) => {
    const albums = await Album.find()
        .sort({ createdAt: -1 })
        .select("title description eventDate coverImageUrl createdAt");

    return res.status(200).json(new ApiResponse(200, albums, "Albums fetched successfully"));
});

/**
 * Get single album with all its photos (public)
 * GET /api/gallery/albums/:id
 */
const getAlbumById = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) throw new ApiError(404, "Album not found");

    const photos = await Photo.find({ album: album._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, { album, photos }, "Album fetched successfully")
    );
});

/**
 * Update album details (title/description/eventDate, optionally replace cover)
 * Auth required
 * PATCH /api/gallery/albums/:id
 */
const updateAlbum = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) throw new ApiError(404, "Album not found");

    const { title, description, eventDate } = req.body;

    if (title !== undefined) album.title = title;
    if (description !== undefined) album.description = description;
    if (eventDate !== undefined) album.eventDate = eventDate;

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.path);
        if (!result) throw new ApiError(500, "Cover image upload failed");

        if (album.coverImagePublicId) {
            await cloudinary.uploader.destroy(album.coverImagePublicId, { resource_type: "image" });
        }

        album.coverImageUrl = result.secure_url;
        album.coverImagePublicId = result.public_id;
    }

    await album.save();

    return res.status(200).json(new ApiResponse(200, album, "Album updated successfully"));
});

/**
 * Delete album — cascades: deletes all photos inside it (DB + Cloudinary) + the cover image
 * Auth required
 * DELETE /api/gallery/albums/:id
 */
const deleteAlbum = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) throw new ApiError(404, "Album not found");

    const photos = await Photo.find({ album: album._id });

    // delete every photo's file from Cloudinary
    for (const photo of photos) {
        await cloudinary.uploader.destroy(photo.imagePublicId, { resource_type: "image" });
    }
    await Photo.deleteMany({ album: album._id });

    if (album.coverImagePublicId) {
        await cloudinary.uploader.destroy(album.coverImagePublicId, { resource_type: "image" });
    }

    await album.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Album and all its photos deleted successfully"));
});

// ─── Photos ───────────────────────────────────────────────────────────────

/**
 * Upload multiple photos into an album
 * Auth required
 * POST /api/gallery/albums/:id/photos
 */
const addPhotosToAlbum = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) throw new ApiError(404, "Album not found");

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one photo is required");
    }

    const uploadedPhotos = [];

    for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (!result) continue; // skip failed uploads, don't fail the whole batch

        const photo = await Photo.create({
            album: album._id,
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
            uploadedBy: req.user._id,
        });

        uploadedPhotos.push(photo);
    }

    if (uploadedPhotos.length === 0) {
        throw new ApiError(500, "All photo uploads failed");
    }

    // if album has no cover yet, use the first uploaded photo as cover
    if (!album.coverImageUrl) {
        album.coverImageUrl = uploadedPhotos[0].imageUrl;
        album.coverImagePublicId = uploadedPhotos[0].imagePublicId;
        await album.save();
    }

    return res.status(201).json(
        new ApiResponse(201, uploadedPhotos, `${uploadedPhotos.length} photo(s) uploaded successfully`)
    );
});

/**
 * Delete a single photo from an album
 * Auth required
 * DELETE /api/gallery/photos/:photoId
 */
const deletePhoto = asyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) throw new ApiError(404, "Photo not found");

    await cloudinary.uploader.destroy(photo.imagePublicId, { resource_type: "image" });
    await photo.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Photo deleted successfully"));
});

export {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    addPhotosToAlbum,
    deletePhoto,
};