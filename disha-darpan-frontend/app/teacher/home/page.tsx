'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AssignmentCard from "./AssignmentCard";
import { apiFetch } from "@/lib/apiClient";
import CollegeSelect from "./CollegeSelect";
import ProfileModal from "./ProfileModal";
import AddAssignmentModal from "./AddAssignmentModal";
import RunEvaluationModal from "./RunEvaluationModal";
import EvaluationResultModal from "./EvaluationResultModal";

// const COLLEGES = [
//   "City College",
//   "Begumpet College",
//   "Hussaini Alam College",
// ];

export default function FacilitatorHomePage() {
  const router = useRouter();
  const [colleges, setColleges] = useState<any[]>([]);
  const [college, setCollege] = useState("");
  
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const [showRunModal, setShowRunModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState([]);

  const [showProfile, setShowProfile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
  const fetchColleges = async () => {
    try {
      const data = await apiFetch("/api/colleges");
      setColleges(data);

      if (data.length > 0) {
        setCollege(data[0].id); // 👈 store ID not name
      }
    } catch (err) {
      console.error("Failed to load colleges");
    }
  };

  fetchColleges();
}, []);
  // 🔥 FETCH ASSIGNMENTS FROM BACKEND
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await apiFetch(
          `/api/assignments/facilitator?college=${college}`
        );
        setAssignments(data);
      } catch (err) {
        console.error("Failed to load assignments");
      }
    };

    fetchAssignments();
  }, [college]);

  const handleAssignmentCreated = (assignment: any) => {
    setAssignments((prev) => [assignment, ...prev]);
  };

  const handleEvaluate = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowRunModal(true);
  };

  const runEvaluation = async () => {
    if (!selectedAssignment) return;

    try {
      setShowRunModal(false);

      const data = await apiFetch("/api/evaluation/run", {
        method: "POST",
        body: JSON.stringify({
          assignmentId: selectedAssignment.id,
        }),
      });

      setEvaluationResults(data.results);
      setShowResultModal(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const confirmSave = async () => {
    try {
      await apiFetch("/api/evaluation/confirm", {
        method: "POST",
        body: JSON.stringify({
          results: evaluationResults,
        }),
      });

      alert("Results saved successfully");
      setShowResultModal(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <CollegeSelect
          colleges={colleges}
          selected={college}
          onChange={setCollege}
        />

        <div className="flex items-center gap-6">
          <div className="flex gap-2 bg-[#334499]/10 p-1 rounded-full">
            <button className="px-5 py-2 rounded-full text-sm font-medium bg-[#334499] text-white">
              ASSIGNMENTS
            </button>

            <button
              onClick={() => router.push("/teacher/analytics")}
              className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white"
            >
              ANALYTICS
            </button>
          </div>

          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-[#FFCC33] font-semibold flex items-center justify-center"
          >
            F
          </button>
        </div>
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((a) => (
          <AssignmentCard
            key={a.id}
            assignment={a}
            onEvaluate={handleEvaluate}
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full
                   bg-[#334499] text-white text-3xl
                   shadow-lg hover:scale-105 transition"
      >
        +
      </button>

      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />

      <AddAssignmentModal
        open={showAddModal}
        college={college}
        onClose={() => setShowAddModal(false)}
        onCreated={handleAssignmentCreated}
      />

      <RunEvaluationModal
        open={showRunModal}
        assignment={selectedAssignment}
        onClose={() => setShowRunModal(false)}
        onRun={runEvaluation}
      />

      <EvaluationResultModal
        open={showResultModal}
        results={evaluationResults}
        onClose={() => setShowResultModal(false)}
        onConfirm={confirmSave}
      />
    </div>
  );
}