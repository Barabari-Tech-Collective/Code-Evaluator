import prisma from "../config/prisma.js";
import axios from "axios";

/* =========================================
   🔹 STEP 1: RUN EVALUATION (PREVIEW ONLY)
========================================= */
export const runEvaluation = async (req, res) => {
  try {
    const { assignmentId } = req.body;

    if (!assignmentId) {
      return res.status(400).json({ message: "Assignment ID required" });
    }

    // 1️⃣ Get assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // 2️⃣ Get submissions
    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      include: { student: true },
    });

    if (!submissions.length) {
      return res.status(400).json({ message: "No submissions found" });
    }

    // 3️⃣ Prepare batch payload using repo links
    const batchPayload = submissions.map((sub) => ({
      submissionId: sub.id,
      studentName: sub.student.name,
      repoLink: sub.repoLink,
      language: sub.language,
    }));

    // 4️⃣ Call evaluator (BATCH BY LINKS)
    const evaluatorResponse = await axios.post(
      "https://js-evaluator-r80h.onrender.com/evaluate-batch-by-links",
      {
        submissions: batchPayload,
        testcases: assignment.testcases,
      }
    );

    const results = evaluatorResponse.data;

    // 5️⃣ Return preview only (DO NOT SAVE YET)
    return res.json({ results });

  } catch (error) {
    console.error("Evaluation error:", error.message);
    return res.status(500).json({ message: "Evaluation failed" });
  }
};



/* =========================================
   🔹 STEP 2: CONFIRM & SAVE RESULTS
========================================= */
export const confirmEvaluation = async (req, res) => {
  try {
    const { results } = req.body;

    if (!results || !results.length) {
      return res.status(400).json({ message: "No results to save" });
    }

    for (const r of results) {

      // Avoid duplicate evaluation
      const existing = await prisma.evaluation.findFirst({
        where: { submissionId: r.submissionId },
      });

      if (existing) {
        continue;
      }

      await prisma.evaluation.create({
        data: {
          submissionId: r.submissionId,
          evaluatorType: "JS",
          totalScore: r.score,
          maxScore: 10,
          feedback: r.feedback || "",
          rawResponse: r,
        },
      });

      await prisma.submission.update({
        where: { id: r.submissionId },
        data: { status: "EVALUATED" },
      });
    }

    return res.json({ message: "Results saved successfully" });

  } catch (error) {
    console.error("Save error:", error);
    return res.status(500).json({ message: "Save failed" });
  }
};