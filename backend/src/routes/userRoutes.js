import express from "express";
import { setRole } from "../controllers/userController.js";

const router = express.Router();

router.post("/role", setRole);

export default router;
