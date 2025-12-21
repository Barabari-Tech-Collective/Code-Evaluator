import express from "express";
import { googleSignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleSignup);

export default router;
