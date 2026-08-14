import { asyncHandler } from "../utils/asyncHandler.js";
import Notice from "../models/notice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

// ─── Notices ──────────────────────────────────────────────────────────────

const ALLOWED_CATEGORIES = ["general", "exam", "holiday", "event", "urgent", "admission"];

// NOTE: this assumes `uploadOnCloudinary(localFilePath, options)` accepts a
// second argument and forwards it to `cloudinary.uploader.upload(...)`.
// If your current helper only takes the file path, it needs a small update
// to accept an options object — otherwise `resource_type: "auto"` below is
// never actually passed to Cloudinary and PDFs will keep failing/misbehaving.
//
// NOTE: this also assumes the Notice model has an `attachmentResourceType`
// field (String). Without it, deletes/replacements can't reliably clean up
// PDFs vs images, since Cloudinary requires the correct resource_type to
// destroy a file — passing the wrong one fails silently (no error, file
// just never gets deleted).

/**
 * Create notice (optionally with an attachment — image or PDF)
 * Auth required
 * POST /api/notices
 */
const createNotice = asyncHandler(async (req, res) => {
    const { title, description, category, isPublished } = req.body;

    if (!title?.trim()) throw new ApiError(400, "Notice title is required");

    if (category && !ALLOWED_CATEGORIES.includes(category)) {
        throw new ApiError(400, "Invalid notice category");
    }

    let attachmentUrl = null;
    let attachmentPublicId = null;
    let attachmentResourceType = null;

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.path, { resource_type: "auto" });
        if (!result) throw new ApiError(500, "Attachment upload failed");
        attachmentUrl = result.secure_url;
        attachmentPublicId = result.public_id;
        attachmentResourceType = result.resource_type; // "image" | "raw" | "video"
    }

    const notice = await Notice.create({
        title,
        description,
        category: category || "general",
        attachmentUrl,
        attachmentPublicId,
        attachmentResourceType,
        isPublished: isPublished !== undefined ? isPublished : true,
        postedBy: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, notice, "Notice created successfully"));
});

/**
 * Get all published notices (public), newest first, optional category filter
 * GET /api/notices
 */
const getAllNotices = asyncHandler(async (req, res) => {
    const { category } = req.query;

    const filter = { isPublished: true };
    if (category) {
        if (!ALLOWED_CATEGORIES.includes(category)) {
            throw new ApiError(400, "Invalid notice category");
        }
        filter.category = category;
    }

    const notices = await Notice.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, notices, "Notices fetched successfully"));
});

/**
 * Get single notice by id (public)
 * GET /api/notices/:id
 */
const getNoticeById = asyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (!notice) throw new ApiError(404, "Notice not found");

    return res.status(200).json(new ApiResponse(200, notice, "Notice fetched successfully"));
});

/**
 * Update notice details (optionally replace attachment — image or PDF)
 * Auth required
 * PATCH /api/notices/:id
 */
const updateNotice = asyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (!notice) throw new ApiError(404, "Notice not found");

    const { title, description, category, isPublished } = req.body;

    if (title !== undefined) notice.title = title;
    if (description !== undefined) notice.description = description;

    if (category !== undefined) {
        if (!ALLOWED_CATEGORIES.includes(category)) {
            throw new ApiError(400, "Invalid notice category");
        }
        notice.category = category;
    }

    if (isPublished !== undefined) notice.isPublished = isPublished;

    if (req.file) {
        const result = await uploadOnCloudinary(req.file.path, { resource_type: "auto" });
        if (!result) throw new ApiError(500, "Attachment upload failed");

        if (notice.attachmentPublicId) {
            await cloudinary.uploader.destroy(notice.attachmentPublicId, {
                resource_type: notice.attachmentResourceType || "image",
            });
        }

        notice.attachmentUrl = result.secure_url;
        notice.attachmentPublicId = result.public_id;
        notice.attachmentResourceType = result.resource_type;
    }

    await notice.save();

    return res.status(200).json(new ApiResponse(200, notice, "Notice updated successfully"));
});

/**
 * Delete notice — also removes its attachment from Cloudinary
 * Auth required
 * DELETE /api/notices/:id
 */
const deleteNotice = asyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (!notice) throw new ApiError(404, "Notice not found");

    if (notice.attachmentPublicId) {
        await cloudinary.uploader.destroy(notice.attachmentPublicId, {
            resource_type: notice.attachmentResourceType || "image",
        });
    }

    await notice.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Notice deleted successfully"));
});

export {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
};