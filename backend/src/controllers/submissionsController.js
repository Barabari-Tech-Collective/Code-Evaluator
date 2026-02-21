import prisma from "../config/prisma.js";

export const createSubmission = async (req, res) => {
  try {
    const { assignmentId, student, repoLink, language } = req.body;

    // 🔹 Basic validation
    if (
      !assignmentId ||
      !student?.id ||
      !student?.name ||
      !student?.email ||
      !student?.collegeId ||
      !repoLink
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 Validate assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // 🔹 Validate college exists
    const college = await prisma.college.findUnique({
      where: { id: student.collegeId },
    });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // 🔹 Upsert student (update if exists, create if new)
    await prisma.student.upsert({
      where: { id: student.id },
      update: {
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        collegeId: student.collegeId,
      },
      create: {
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        collegeId: student.collegeId,
        userId: student.id, // assuming same ID mapping
      },
    });

    // 🔹 Keep only latest submission (one per assignment per student)
    await prisma.submission.deleteMany({
      where: {
        assignmentId,
        studentId: student.id,
      },
    });

    // 🔹 Create new submission
    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId: student.id,
        repoLink,
        language,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      message: "Submission stored successfully",
      submissionId: submission.id,
    });

  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};