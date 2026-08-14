import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
    {
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            required: true,
            index: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        imagePublicId: {
            type: String,
            required: true,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;