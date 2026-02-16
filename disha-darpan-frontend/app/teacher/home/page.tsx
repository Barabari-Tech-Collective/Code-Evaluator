'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AssignmentCard from "./AssignmentCard"
// import { useEffect } from "react";
import CollegeSelect from "./CollegeSelect";
import ProfileModal from "./ProfileModal";
import AddAssignmentModal from "./AddAssignmentModal";
// import AnalyticsPage from "../analytics/page";
import RunEvaluationModal from "./RunEvaluationModal";
import EvaluationResultModal from "./EvaluationResultModal";

const COLLEGES = [
  "City College",
  "Begumpet College",
  "Hussaini Alam College",
];

const TABS = ["ASSIGNMENTS", "ANALYTICS"] as const;
type TabType = typeof TABS[number];

const MOCK_ASSIGNMENTS_BY_COLLEGE: Record<string, any[]> = {
  "City College": [
    {
      id: "1",
      title: "JS Array Methods",
      domain: "JavaScript",
      subject: "JavaScript",
      type: "UNIT",
      submissions: 32,
      evaluator: "JS Evaluator",
    },
  ],
  "Begumpet College": [
    {
      id: "2",
      title: "React Todo App",
      domain: "React",
      subject: "React",
      type: "CAPSTONE",
      submissions: 18,
      evaluator: "React Evaluator",
    },
  ],
  "Hussaini Alam College": [
    {
      id: "3",
      title: "HTML Semantic Page",
      domain: "HTML/CSS",
      subject: "HTML",
      type: "MICRO",
      submissions: 44,
      evaluator: "HTML/CSS Evaluator",
    },
  ],
};


export default function FacilitatorHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("ASSIGNMENTS");
  const [college, setCollege] = useState(COLLEGES[0]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
const [showRunModal, setShowRunModal] = useState(false);
const [showResultModal, setShowResultModal] = useState(false);
const [evaluationResults, setEvaluationResults] = useState([]);

  const [showProfile, setShowProfile] = useState(false);
  const [assignments, setAssignments] = useState(
  MOCK_ASSIGNMENTS_BY_COLLEGE[college]
);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAssignmentCreated = (assignment) => {
  setAssignments((prev) => [assignment, ...prev]);
  };
  
  const handleEvaluate = (assignment) => {
  setSelectedAssignment(assignment);
  setShowRunModal(true);
};

const runEvaluation = async () => {
  setShowRunModal(false);

  // 🔴 BACKEND TODO:
  // POST /evaluator/run
  // body: { assignmentId }

  // DEMO MOCK RESPONSE
  const mockResults = [
    { student: "Asiya", score: 82, feedback: "Good logic" },
    { student: "Rahul", score: 74, feedback: "Edge cases missing" },
    { student: "Aman", score: 69, feedback: "Needs improvement" },
  ];

  setEvaluationResults(mockResults);
  setShowResultModal(true);
};


const confirmSave = async () => {
  setShowResultModal(false);

  // 🔴 BACKEND TODO:
  // POST /evaluations/confirm
  // body: evaluationResults

  alert("Results saved successfully (demo)");
};



  return (
    <div className="min-h-screen bg-white text-black p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">

        <CollegeSelect
          colleges={COLLEGES}
          selected={college}
          onChange={setCollege}
        />

        <div className="flex items-center gap-6">
           {/* NAV BUTTONS */}
          <div className="flex gap-2 bg-[#334499]/10 p-1 rounded-full">
            <button
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#334499] text-white"
            >
              ASSIGNMENTS
            </button>

            <button
              onClick={() => router.push("/teacher/analytics")}
              className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white"
            >
              ANALYTICS
            </button>
          </div>
          {/* Tabs */}
          {/* <div className="flex gap-2 bg-[#334499]/10 p-1 rounded-full">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${activeTab === tab
                    ? "bg-[#334499] text-white"
                    : "text-black hover:bg-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div> */}

          {/* Profile */}
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-[#FFCC33] font-semibold flex items-center justify-center"
          >
            F
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === "ASSIGNMENTS" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignments.map(a => (
              <AssignmentCard key={a.id} assignment={a} 
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
        </>
      )}
{/* 
      {activeTab === "ANALYTICS" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border">
            <p className="text-sm opacity-70">Total Assignments</p>
            <p>Hardcoded data</p>
            <h2 className="text-3xl font-semibold">12</h2>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border">
            <p className="text-sm opacity-70">Total Submissions</p>
            <h2 className="text-3xl font-semibold">420</h2>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur border">
            <p className="text-sm opacity-70">Pending Evaluations</p>
            <h2 className="text-3xl font-semibold">58</h2>
          </div>
        </div>
       <AnalyticsPage college={college} />
       )} */}

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
