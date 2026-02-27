"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";

export default function AddAssignmentModal({
  open,
  onClose,
  onCreated,
  college,
}: any) {
  const unitOptions: Record<string, string[]> = {
    JavaScript: [
      "Unit 1",
      "Unit 2",
      "Unit 3",
      "Unit 4",
      "Unit 5",
      "Unit 6",
      "Unit 7",
    ],
    HTML: ["Unit 1", "Unit 2"],
    CSS: ["Unit 1", "Unit 2", "Unit 3"],
    React: ["Unit 1", "Unit 2", "Unit 3"],
    Backend: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"],
  };

  const { data: session } = useSession();
  const [unit, setUnit] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("ASSIGNMENT");
  const [subject, setSubject] = useState("HTML");
  const [instruction, setInstruction] = useState("");
  const [rubrics, setRubrics] = useState("");
  const [evaluatorType, setEvaluatorType] = useState("JS Evaluator");
  const [deadline, setDeadline] = useState("");

  const handlePost = async () => {
    if (!title || !deadline) {
      alert("Title and deadline are required");
      return;
    }

    if (!session?.backendToken) {
      alert("Session expired");
      return;
    }

    const payload = {
      title,
      type,
      subject,
      unit,
      evaluatorType,
      instruction,
      rubrics,
      deadline,
      college,
    };

    try {
      const newAssignment = await apiFetch(
        "/assignments",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        session.backendToken,
      );

      onCreated(newAssignment);
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to create assignment");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>

        <div className="space-y-3 text-sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment Title"
            className="w-full border rounded-lg px-3 py-2"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="ASSIGNMENT">Assignment</option>
            <option value="CAPSTONE">CAPSTONE</option>
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>HTML</option>
            <option>CSS</option>
            <option>JavaScript</option>
            <option>React</option>
            <option>Backend</option>
          </select>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Unit</option>
            {unitOptions[subject]?.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <input
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Instruction Document URL"
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            value={rubrics}
            onChange={(e) => setRubrics(e.target.value)}
            placeholder="Rubrics"
            className="w-full border rounded-lg px-3 py-2"
          />

          <select
            value={evaluatorType}
            onChange={(e) => setEvaluatorType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>JS Evaluator</option>
            <option>HTML/CSS Evaluator</option>
            <option>React Evaluator</option>
            <option>Backend Evaluator</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handlePost}
            className="flex-1 py-2 rounded-lg bg-[#334499] text-white"
          >
            Post Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
