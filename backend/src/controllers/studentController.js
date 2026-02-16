import prisma from "../config/prisma.js";

export const studentOnboard = async (req, res) => {
  try {
    const { name, email, collegeId, course } = req.body;

    if (!name || !email || !collegeId || !course) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional safety check
    const collegeExists = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!collegeExists) {
      return res.status(400).json({ message: "Invalid college" });
    }

    const student = await prisma.student.create({
      data: {
        name,
        email,
        collegeId,
        course,
        userId: user.id,
      },
    });

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Student onboarding failed" });
  }
};
