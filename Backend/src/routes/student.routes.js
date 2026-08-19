import { Router } from "express";
import {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    importStudents,
    getTodaysBirthdays,
    getUpcomingBirthdays,
} from "../controllers/student.controller.js";

import { verifyjwt } from "../middlewares/auth.middleware.js";
import { uploadExcel } from "../middlewares/upload.middleware.js";

const router = Router();

// ─── Public ───────────────────────────────────────────────
// Birthday endpoints only ever return studentName/className/photo —
// no admissionNo, DOB, or other private fields (see studentController).

router.get("/birthdays/today", getTodaysBirthdays);
router.get("/birthdays/upcoming", getUpcomingBirthdays);

// ─── Authenticated (admin) ─────────────────────────────────

router.get("/", verifyjwt, getStudents);
router.get("/:id", verifyjwt, getStudentById);
router.post("/", verifyjwt, createStudent);
router.put("/:id", verifyjwt, updateStudent);
router.delete("/:id", verifyjwt, deleteStudent);

router.post("/import", verifyjwt, uploadExcel.single("file"), importStudents);

export default router;