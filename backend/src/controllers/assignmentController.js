import prisma from "../config/prisma.js";


export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      type,
      subject,
      unit,              // ✅ NEW
      evaluatorType,
      instruction,       // ✅ Single field (URL or plain text)
      rubrics,
      deadline,
      college,
    } = req.body;

    const { userId } = req.user;

    // Basic validation
    if (!title || !type || !subject || !college || !deadline) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Check teacher
    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      return res.status(403).json({ message: "Not a teacher" });
    }

    // Create assignment in DISHA DB first
    const assignment = await prisma.assignment.create({
      data: {
        title,
        type,
        subject,
        unit,                  // ✅ NEW
        evaluatorType,
        instruction,           // ✅ single field
        rubrics,
        deadline: new Date(deadline),
        college: {
          connect: { id: college },
        },
        teacher: {
          connect: { id: teacher.id },
        },
      },
      include: {
        college: true, // needed to get externalId
      },
    });

    /**
     * Sync to Code Guru
     * Important: This should NOT break assignment creation
     */
    try {
      await axios.post(
        `${process.env.CODE_GURU_BASE_URL}/api/external/assignments`,
        {
          external_assignment_id: assignment.id,
          title: assignment.title,
          type: assignment.type,
          subject: assignment.subject,
          unit: assignment.unit,
          evaluatorType: assignment.evaluatorType,
          instruction: assignment.instruction,
          rubrics: assignment.rubrics,
          deadline: assignment.deadline,
          college_external_id: assignment.college.externalId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CODE_GURU_SECRET}`,
          },
        }
      );
    } catch (syncError) {
      console.error("Assignment sync failed:", syncError.message);
      // Do NOT throw error — assignment already created
    }

    return res.status(201).json(assignment);

  } catch (err) {
    console.error("Assignment creation failed:", err);
    return res.status(500).json({ message: "Assignment creation failed" });
  }
};
// export const createAssignment = async (req, res) => {
//   try {
//     const {
//       title,
//       type,
//       subject,
//       evaluatorType,
//       instructionUrl,
//       rubrics,
//       deadline,
//       college,
//     } = req.body;
//     console.log("Req user", req.user);

//     const { userId } = req.user; // coming from JWT middleware

//     if (
//      input data
//     ) {
//       return res.status(400).json({ message: "Invalid input" });
//     }

//     console.log("User Id from teacher lookup", userId);


//     const teacher = await prisma.teacher.findUnique({
//       where: { 
//         userId: userId
//       },
//     });

//     if (!teacher) {
//       return res.status(403).json({ message: "Not a teacher" });
//     }

//     const assignment = await prisma.assignment.create({
//       data: {
//         title,
//         type,
//         subject,
//         evaluatorType,
//         instructionUrl,
//         rubrics,
//         deadline: new Date(deadline),
//         college: {
//           connect: { id: college }
//         },
//         teacher: {
//       connect: { id: teacher.id },
//     },
//       },
//     });

//     res.status(201).json(assignment);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Assignment creation failed" });
//   }
// };


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

    const userId = req.user.userId;

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
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    });

    // 🔥 Flatten submission count for frontend
    const formatted = assignments.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      subject: a.subject,
      deadline: a.deadline,
      submissions: a._count.submissions, // 👈 THIS IS IMPORTANT
    }));

    res.status(200).json(formatted);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};