import prisma from "../config/prisma.js";

export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      type,
      subject,
      evaluatorType,
      instructionUrl,
      rubrics,
      deadline,
      college,
    } = req.body;
    console.log("Req user", req.user);

    const { userId } = req.user; // coming from JWT middleware

    if (
      !title ||
      !type ||
      !subject ||
      !college ||
      !deadline
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    console.log("User Id from teacher lookup", userId);


    const teacher = await prisma.teacher.findUnique({
      where: { 
        userId: userId
      },
    });

    if (!teacher) {
      return res.status(403).json({ message: "Not a teacher" });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        type,
        subject,
        evaluatorType,
        instructionUrl,
        rubrics,
        deadline: new Date(deadline),
        college,
        teacherId: teacher.id,
      },
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assignment creation failed" });
  }
};


export const getStudentAssignments = async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        subject,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        type: true,
        subject: true,
        instructionUrl: true,
        deadline: true,
        createdAt: true,
      },
    });

    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};


export const getFacilitatorAssignments = async (req, res) => {
  try {
    const { college } = req.query;

    if (!college) {
      return res.status(400).json({ message: "College is required" });
    }

    const userId = req.user.id;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      return res.status(403).json({ message: "Not a teacher" });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        college,
        teacherId: teacher.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        type: true,
        subject: true,
        deadline: true,
        createdAt: true,
        _count: {
          select: {
            submissions: true, // if you have submissions relation
          },
        },
      },
    });

    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};
