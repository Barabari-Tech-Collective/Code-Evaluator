import express from "express";
import { getColleges } from "../controllers/clgController";

const router = express.Router();

router.get('/colleges', getColleges)

export default router;