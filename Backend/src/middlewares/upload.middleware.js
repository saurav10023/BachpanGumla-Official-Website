import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const MAX_FILE_SIZE_MB = 5;

const ALLOWED_MIME_TYPES = new Set([
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", 
]);

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const isAllowedMime = ALLOWED_MIME_TYPES.has(file.mimetype);
    const isAllowedExt = /\.(xlsx|xls)$/i.test(file.originalname);

    if (!isAllowedMime && !isAllowedExt) {
        return cb(new ApiError(400, "Only .xlsx or .xls files are allowed"));
    }
    cb(null, true);
};

export const uploadExcel = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
        files: 1,
    },
});