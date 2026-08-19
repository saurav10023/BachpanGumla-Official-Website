import * as XLSX from "xlsx";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const REQUIRED_COLUMNS = ["Admission No", "Student Name", "Class", "Date of Birth"];

// Maps normalized (lowercase, single-spaced) header text -> canonical field name.
// Add more variants here as you encounter new source files.
const HEADER_ALIASES = {
    "admission no": "Admission No",
    "admission no.": "Admission No",
    "admissionno": "Admission No",
    "admission number": "Admission No",
    "admissionnumber": "Admission No",
    "adm no": "Admission No",

    "student name": "Student Name",
    "name": "Student Name",

    "class": "Class",

    "date of birth": "Date of Birth",
    "dob": "Date of Birth",

    "student photo": "Student Photo",
    "photo": "Student Photo",
};

const normalizeHeader = (s) =>
    String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Scans the first `maxScanRows` rows of a sheet (parsed as raw arrays) to find
 * the actual header row. Real-world exports (report titles, class-summary
 * lines, blank rows) often sit above the real table, so we can't assume the
 * header is row 1. We pick the first row that matches at least 3 of our
 * required columns.
 *
 * Returns { headerRowIndex, columnMap } where columnMap is
 * { columnIndex: canonicalFieldName }, or headerRowIndex === -1 if not found.
 */
const findHeaderRow = (rawRows, maxScanRows = 20) => {
    const scanLimit = Math.min(rawRows.length, maxScanRows);

    for (let i = 0; i < scanLimit; i++) {
        const candidate = (rawRows[i] || []).map(normalizeHeader);
        const columnMap = {};
        let matches = 0;

        candidate.forEach((cell, colIdx) => {
            const canonical = HEADER_ALIASES[cell];
            if (canonical) {
                columnMap[colIdx] = canonical;
                matches++;
            }
        });

        // Require at least 3 of the 4 required columns to treat this as the header row.
        if (matches >= 3) {
            return { headerRowIndex: i, columnMap };
        }
    }

    return { headerRowIndex: -1, columnMap: {} };
};

/**
 * Converts raw row arrays (below the header) into row objects keyed by
 * canonical field name, using the columnMap from findHeaderRow. Drops rows
 * that are entirely blank (common trailing rows in exported sheets).
 */
const buildRowObjects = (rawRows, headerRowIndex, columnMap) => {
    return rawRows
        .slice(headerRowIndex + 1)
        .map((rawRow) => {
            const obj = {};
            Object.entries(columnMap).forEach(([colIdx, fieldName]) => {
                obj[fieldName] = rawRow[Number(colIdx)] ?? "";
            });
            return obj;
        })
        .filter((row) => Object.values(row).some((v) => String(v).trim() !== ""));
};

/**
 * Parses an Excel "Date of Birth" cell into a JS Date.
 * Handles Excel serial-date numbers, JS Date objects (xlsx with cellDates:true),
 * and common string formats (DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD).
 * Returns null if it cannot confidently parse the value.
 */
const parseExcelDate = (value) => {
    if (value instanceof Date && !isNaN(value)) return value;

    if (typeof value === "number") {
        const parsed = XLSX.SSF.parse_date_code(value);
        if (!parsed) return null;
        const d = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
        return isNaN(d) ? null : d;
    }

    if (typeof value === "string") {
        const trimmed = value.trim();

        // DD/MM/YYYY or DD-MM-YYYY
        let match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        if (match) {
            const [, dd, mm, yyyy] = match;
            const d = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
            return isNaN(d) ? null : d;
        }

        // YYYY-MM-DD
        match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (match) {
            const [, yyyy, mm, dd] = match;
            const d = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
            return isNaN(d) ? null : d;
        }
    }

    return null;
};

/** Returns { valid, errors[] } for one parsed Excel row. */
const validateRow = (row, rowNumber) => {
    const errors = [];

    const admissionNo = String(row["Admission No"] ?? "").trim();
    const studentName = String(row["Student Name"] ?? "").trim();
    const className = String(row["Class"] ?? "").trim();
    const dob = parseExcelDate(row["Date of Birth"]);

    if (!admissionNo) errors.push("Admission No is missing");
    if (!studentName) errors.push("Student Name is missing");
    if (!className) errors.push("Class is missing");
    if (!dob) errors.push("Date of Birth is missing or unparseable");
    else if (dob > new Date()) errors.push("Date of Birth cannot be in the future");

    if (errors.length) {
        return { valid: false, errors: errors.map((e) => `Row ${rowNumber}: ${e}`) };
    }

    return {
        valid: true,
        data: {
            admissionNo: admissionNo.toUpperCase(),
            studentName,
            className,
            dateOfBirth: dob,
            birthMonth: dob.getUTCMonth() + 1,
            birthDay: dob.getUTCDate(),
            photo: String(row["Student Photo"] ?? "").trim(),
        },
    };
};

/** Today's { month, day } in the school's timezone (Asia/Kolkata), DST-safe. */
const getTodayInSchoolTimezone = () => {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const month = Number(parts.find((p) => p.type === "month").value);
    const day = Number(parts.find((p) => p.type === "day").value);
    return { month, day };
};

// Public-safe projection — never expose admissionNo, full DOB, or other private fields here.
const PUBLIC_BIRTHDAY_FIELDS = "studentName className photo -_id";

// ─── Student CRUD ───────────────────────────────────────────────────────────

/**
 * List students (paginated, optional search/class filter)
 * Admin only
 * GET /api/students?page=&limit=&search=&className=
 */
const getStudents = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const { search, className } = req.query;

    const filter = {};
    if (className) filter.className = className;
    if (search) {
        filter.$or = [
            { studentName: { $regex: search, $options: "i" } },
            { admissionNo: { $regex: search, $options: "i" } },
        ];
    }

    const [students, total] = await Promise.all([
        Student.find(filter)
            .sort({ studentName: 1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Student.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            { students, total, page, pages: Math.ceil(total / limit) },
            "Students fetched successfully"
        )
    );
});

/**
 * Get single student
 * Admin only
 * GET /api/students/:id
 */
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");

    return res.status(200).json(new ApiResponse(200, student, "Student fetched successfully"));
});

/**
 * Create student
 * Admin only
 * POST /api/students
 */
const createStudent = asyncHandler(async (req, res) => {
    let { admissionNo, studentName, className, dateOfBirth, photo } = req.body;

    admissionNo = admissionNo?.trim().toUpperCase();

    if (!admissionNo || !studentName || !className || !dateOfBirth) {
        throw new ApiError(400, "Admission No, Student Name, Class and Date of Birth are required");
    }

    const dob = new Date(dateOfBirth);
    if (isNaN(dob)) throw new ApiError(400, "Invalid Date of Birth");

    const existing = await Student.findOne({ admissionNo });
    if (existing) throw new ApiError(409, "Admission number already exists");

    const student = await Student.create({
        admissionNo,
        studentName,
        className,
        dateOfBirth: dob,
        photo,
        createdBy: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, student, "Student created successfully"));
});

/**
 * Update student
 * Admin only
 * PUT /api/students/:id
 */
const updateStudent = asyncHandler(async (req, res) => {
    const { studentName, className, dateOfBirth, photo, isActive } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");

    if (studentName !== undefined) student.studentName = studentName;
    if (className !== undefined) student.className = className;
    if (photo !== undefined) student.photo = photo;
    if (isActive !== undefined) student.isActive = isActive;

    if (dateOfBirth !== undefined) {
        const dob = new Date(dateOfBirth);
        if (isNaN(dob)) throw new ApiError(400, "Invalid Date of Birth");
        student.dateOfBirth = dob; // pre-validate hook recalculates birthMonth/birthDay
    }

    student.updatedBy = req.user._id;
    await student.save();

    return res.status(200).json(new ApiResponse(200, student, "Student updated successfully"));
});

/**
 * Delete student
 * Admin only
 * DELETE /api/students/:id
 */
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");

    return res.status(200).json(new ApiResponse(200, {}, "Student deleted successfully"));
});

// ─── Excel Import ───────────────────────────────────────────────────────────

/**
 * Import students from an uploaded Excel file (upsert by admissionNo)
 * Admin only — expects multer memoryStorage, field name "file"
 * POST /api/students/import
 *
 * Header row is auto-detected: real-world exports often have title/summary
 * rows above the actual table, and header text is matched via aliases
 * (e.g. "AdmissionNumber", "Date of birth") rather than exact strings.
 */
const importStudents = asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "No Excel file uploaded");

    let workbook;
    try {
        workbook = XLSX.read(req.file.buffer, { type: "buffer", cellDates: true });
    } catch (err) {
        throw new ApiError(400, "Could not read the uploaded file. Is it a valid .xlsx/.xls file?");
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Read as raw arrays (no assumed header row) so we can scan for the real header.
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

    if (!rawRows.length) throw new ApiError(400, "Excel file has no data");

    const { headerRowIndex, columnMap } = findHeaderRow(rawRows);

    if (headerRowIndex === -1) {
        throw new ApiError(400, `Missing required column(s): ${REQUIRED_COLUMNS.join(", ")}`);
    }

    const mappedFieldNames = Object.values(columnMap);
    const missingColumns = REQUIRED_COLUMNS.filter((col) => !mappedFieldNames.includes(col));
    if (missingColumns.length) {
        throw new ApiError(400, `Missing required column(s): ${missingColumns.join(", ")}`);
    }

    const rows = buildRowObjects(rawRows, headerRowIndex, columnMap);

    if (!rows.length) throw new ApiError(400, "Excel file has no data rows");

    const summary = { total: rows.length, inserted: 0, updated: 0, failed: 0, errors: [] };

    // De-dupe admission numbers *within this file* before touching the DB,
    // so a bad duplicate row doesn't silently overwrite a good one.
    const seenInFile = new Map(); // admissionNo -> first row number that used it

    for (let i = 0; i < rows.length; i++) {
        // +1 for 1-indexing, +1 for the header row itself, + offset of header row in the sheet
        const rowNumber = i + headerRowIndex + 2;
        const { valid, errors, data } = validateRow(rows[i], rowNumber);

        if (!valid) {
            summary.failed++;
            summary.errors.push(...errors);
            continue;
        }

        if (seenInFile.has(data.admissionNo)) {
            summary.failed++;
            summary.errors.push(
                `Row ${rowNumber}: Duplicate Admission No "${data.admissionNo}" (already used in row ${seenInFile.get(
                    data.admissionNo
                )} of this file)`
            );
            continue;
        }
        seenInFile.set(data.admissionNo, rowNumber);

        try {
            const result = await Student.findOneAndUpdate(
                { admissionNo: data.admissionNo },
                { $set: { ...data, updatedBy: req.user._id }, $setOnInsert: { createdBy: req.user._id } },
                { upsert: true, new: true, runValidators: true, rawResult: true }
            );

            if (result.lastErrorObject?.updatedExisting) {
                summary.updated++;
            } else {
                summary.inserted++;
            }
        } catch (err) {
            summary.failed++;
            summary.errors.push(`Row ${rowNumber}: ${err.message}`);
        }
    }

    return res.status(200).json(new ApiResponse(200, summary, "Import completed"));
});

// ─── Birthday APIs (public) ─────────────────────────────────────────────────

/**
 * Students whose birthday is today, in the school's timezone
 * Public
 * GET /api/students/birthdays/today
 */
const getTodaysBirthdays = asyncHandler(async (req, res) => {
    const { month, day } = getTodayInSchoolTimezone();

    const students = await Student.find({
        birthMonth: month,
        birthDay: day,
        isActive: true,
    }).select(PUBLIC_BIRTHDAY_FIELDS);

    return res.status(200).json(new ApiResponse(200, students, "Today's birthdays fetched successfully"));
});

/**
 * Students with birthdays in the next N days (default 7), in the school's timezone
 * Public
 * GET /api/students/birthdays/upcoming?days=7
 */
const getUpcomingBirthdays = asyncHandler(async (req, res) => {
    const days = Math.min(31, Math.max(1, parseInt(req.query.days) || 7));
    const { month, day } = getTodayInSchoolTimezone();

    // Build the list of {month, day} pairs to look for, walking forward
    // day-by-day so month/year rollovers are handled without manual math.
    const targets = [];
    const cursor = new Date(Date.UTC(2001, month - 1, day)); // any non-leap year as a wheel
    for (let i = 0; i < days; i++) {
        cursor.setUTCDate(cursor.getUTCDate() + 1);
        targets.push({ birthMonth: cursor.getUTCMonth() + 1, birthDay: cursor.getUTCDate() });
    }

    const students = await Student.find({
        isActive: true,
        $or: targets,
    }).select(`${PUBLIC_BIRTHDAY_FIELDS} birthMonth birthDay`);

    return res.status(200).json(new ApiResponse(200, students, "Upcoming birthdays fetched successfully"));
});

export {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    importStudents,
    getTodaysBirthdays,
    getUpcomingBirthdays,
};