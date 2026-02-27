import prisma from "../config/prisma.js";

export const createSubmission = async (req, res) => {
  try {
    /**
     * {
     *   assignment_id,
     *   student: {
     *     id,
     *     name,
     *     email,
     *     college_external_id,
     *     course,
     *     year
     *   },
     *   solution_link
     * }
     */
    const { assignment_id, student, solution_link } = req.body;

    /**
     * Validate required fields including college_external_id
     */
    if (
      !assignment_id ||
      !student?.id ||
      !student?.name ||
      !student?.email ||
      !student?.college_external_id ||
      !solution_link
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    /**
     * This maps Code Guru college ID → Disha internal college ID
     */
    const college = await prisma.college.findUnique({
      where: { externalId: student.college_external_id },
    });

    if (!college) {
      return res.status(404).json({
        message: "College not found in Disha",
      });
    }

    /**
     */
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignment_id },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    /**
     * Ensure assignment belongs to same college
     */
    if (assignment.collegeId !== college.id) {
      return res.status(400).json({
        message: "Assignment does not belong to student's college",
      });
    }

    /**
     * If student exists → update
     * If not → create
     * Always map to internal Disha college.id
     */
    await prisma.student.upsert({
      where: { id: student.id },
      update: {
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        collegeId: college.id,
      },
      create: {
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        collegeId: college.id,
      },
    });

    /**
     * ✅ 7️⃣ Keep only latest submission per assignment per student
     */
    await prisma.submission.deleteMany({
      where: {
        assignmentId: assignment_id,
        studentId: student.id,
      },
    });

    /**
     * ✅ 8️⃣ Create new submission
     */
    const submission = await prisma.submission.create({
      data: {
        assignmentId: assignment_id,
        studentId: student.id,
        repoLink: solution_link,
        status: "PENDING",
      },
    });

    /**
     * ✅ 9️⃣ Success response
     */
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
