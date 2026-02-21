import express from "express";
import { setRole } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/role",authenticate, setRole);

export default router;
