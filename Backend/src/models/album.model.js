import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Album title is required"],
            trim: true,
            maxlength: [150, "Title cannot exceed 150 characters"],
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        eventDate: {
            type: Date,
            default: null,
        },

        coverImageUrl: {
            type: String,
            default: null,
        },

        coverImagePublicId: {
            type: String,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

albumSchema.index({ createdAt: -1 });

const Album = mongoose.model("Album", albumSchema);
export default Album;