import express from "express";
import { checkTeacherProfile, teacherOnboard } from "../controllers/teacherController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
    "/onboard",
    authenticate,
    // authorizeRoles("FACILITATOR", "SR_FACILITATOR"),
    teacherOnboard
);
router.get("/me",authenticate,  checkTeacherProfile)

export default router;
