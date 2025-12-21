import prisma from "../config/prisma.js";

export const teacherOnboard = async (req, res) => {
  try {
    const { name, email, colleges } = req.body;

    if (!name || !email || !Array.isArray(colleges)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        colleges,
        userId: user.id,
      },
    });

    res.status(201).json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Teacher onboarding failed" });
  }
};
