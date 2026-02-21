import express from "express";
import { checkStudentProfile, studentOnboard } from "../controllers/studentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
    "/onboard",
    authenticate,
    // authorizeRoles("STUDENT"),
    studentOnboard
);

router.get("/me", checkStudentProfile)

export default router;
