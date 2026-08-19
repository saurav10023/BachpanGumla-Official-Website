import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        admissionNo: {
            type: String,
            required: [true, "Admission number is required"],
            unique: true,
            trim: true,
            uppercase: true,
        },

        studentName: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            maxlength: [100, "Student name cannot exceed 100 characters"],
        },

        className: {
            type: String,
            required: [true, "Class is required"],
            trim: true,
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
        },

        // Denormalized for fast birthday-of-the-day lookups (indexed together below).
        // Always derived from dateOfBirth — never set these directly, use setDOB().
        birthMonth: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },

        birthDay: {
            type: Number,
            required: true,
            min: 1,
            max: 31,
        },

        photo: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

// Compound index powers GET /api/students/birthdays/today and /upcoming
studentSchema.index({ birthMonth: 1, birthDay: 1 });

// Keep birthMonth/birthDay in sync whenever dateOfBirth is set/changed
// (covers .save() flows — the bulk-import path in the controller sets these explicitly too).
studentSchema.pre("validate", function (next) {
    if (this.isModified("dateOfBirth") && this.dateOfBirth) {
        const dob = new Date(this.dateOfBirth);
        this.birthMonth = dob.getUTCMonth() + 1;
        this.birthDay = dob.getUTCDate();
    }
    next();
});

const Student = mongoose.model("Student", studentSchema);
export default Student;

