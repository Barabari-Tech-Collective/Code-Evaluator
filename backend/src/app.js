import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clgRoutes from "./routes/clgRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js"
import evaluationRoutes from "./routes/evaluationRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/facilitator", teacherRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api", clgRoutes);

export default app;
