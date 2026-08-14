import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            enum: ["general", "exam", "holiday", "event", "urgent", "admission"],
            default: "general",
        },

        attachmentUrl: {
            type: String,
            default: null,
        },

        attachmentPublicId: {
            type: String,
            default: null, // needed to delete from Cloudinary later
        },

        isPublished: {
            type: Boolean,
            default: true, // supports draft/scheduled posting later if you want it
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// newest notices fetched first — index speeds up the default listing query
noticeSchema.index({ createdAt: -1 });

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;