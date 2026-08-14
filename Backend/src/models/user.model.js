import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            match: [
                /^[a-z0-9_]+$/,
                "Username can only contain lowercase letters, numbers, and underscores",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false, // never returned by default on .find()/.findOne()
        },

        name: {
            type: String,
            default: "",
            trim: true,
        },

        userType: {
            type: String,
            enum: ["admin", "super admin"],
            default: "admin",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null, // null only for the very first super admin (seeded manually)
        },

        isActive: {
            type: Boolean,
            default: true, // lets super admin disable an admin instead of deleting
        },

        refreshToken: {
            type: String,
            default: "",
            select: false,
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password on login
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username, userType: this.userType },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model("User", userSchema);
export default User;