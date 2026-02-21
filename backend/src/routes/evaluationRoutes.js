import express from "express";
import { runEvaluation, confirmEvaluation } from "../controllers/evaluationController.js";

const router = express.Router();

router.post("/run", runEvaluation);
router.post("/confirm", confirmEvaluation);

export default router;