import prisma from "../config/prisma.js";

export const teacherOnboard = async (req, res) => {
  try {
    const { collegeIds } = req.body;
    const { userId, email } = req.user;
    console.log("this is request body", req.body);
    console.log("this is user details", req.user);

    if (!email || !Array.isArray(collegeIds)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const teacher = await prisma.teacher.create({
      // where: {userId: user.id},
      // update: {},
      data: {
        name: user.name,
        userId: user.id,
      },
    });
    // Map teacher to colleges
    await prisma.teacherCollege.createMany({
      data: collegeIds.map((collegeId) => ({
        teacherId: teacher.id,
        collegeId
      })),
      skipDuplicates: true
    });

    res.status(201).json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Teacher onboarding failed" });
  }
};


export const checkTeacherProfile = async (req, res) => {
  try {
    const { userId } = req.user.userId;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    res.json({
      exists: !!teacher,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to check teacher profile" });
  }
};