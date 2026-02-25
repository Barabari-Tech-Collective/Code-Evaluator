import express from "express";

import { createSubmission } from "../controllers/submissionsController.js";

const router = express.Router();

router.post("/", createSubmission);

export default router;