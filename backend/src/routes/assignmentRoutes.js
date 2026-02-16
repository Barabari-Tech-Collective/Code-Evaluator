import express from "express";
import { createAssignment, getFacilitatorAssignments, getStudentAssignments } from "../controllers/assignmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
//   authorizesRoles("FACILITATOR"),
  createAssignment
);

router.get("/student", getStudentAssignments);

router.get("/teacher", getFacilitatorAssignments)

export default router;
