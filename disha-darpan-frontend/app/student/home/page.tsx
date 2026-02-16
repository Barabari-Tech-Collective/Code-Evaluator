'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProfileModal from "./ProfileModal";
import { apiFetch } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Advanced JavaScript",
  "React",
  "Advanced React",
  "Backend",
];

const FILTERS = ["ALL", "MICRO", "UNIT", "CAPSTONE"] as const;
type FilterType = typeof FILTERS[number];

export default function StudentHomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [showProfile, setShowProfile] = useState(false);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userInitial =
    session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  /* ---------------- FETCH ASSIGNMENTS ---------------- */
  useEffect(() => {
    if (!session?.backendToken) return;

    let isMounted = true;

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const data = await apiFetch(
          `/assignments/student?subject=${activeSubject}`,
          {},
          session.backendToken!
        );
        if (isMounted) {
          setAssignments(data);
        }
      } catch {
        if (isMounted) {
          setAssignments([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAssignments();

    return () => {
      isMounted = false;
    };
  }, [activeSubject, session?.backendToken]);

  /* ---------------- FILTER ---------------- */
  const filteredAssignments = assignments.filter((a) => {
    const filterMatch =
      activeFilter === "ALL" || a.type === activeFilter;
    return filterMatch;
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF] text-[#0F172A]">

      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-gray-500 backdrop-blur-xl border-r border-white/40 px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Subjects</h2>

        <div className="space-y-1">
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`w-full px-3 py-2 rounded-lg text-left transition
                ${activeSubject === subject
                  ? "bg-[#1E3A8A] text-white shadow-md"
                  : "text-[#334155] hover:bg-[#EEF2FF]"
                }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          {/* FILTERS */}
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeFilter === filter
                    ? "bg-[#FACC15] text-black"
                    : "bg-white border text-[#374151] hover:bg-gray-100"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* PROFILE */}
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white font-semibold shadow-md hover:scale-105 transition"
          >
            {userInitial}
          </button>
        </div>

        {/* ASSIGNMENTS */}
        {loading && (
          <p className="text-sm text-[#64748B]">Loading assignments...</p>
        )}

        {!loading && filteredAssignments.length === 0 && (
          <p className="text-[#6B7280]">No assignments available</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredAssignments.map((a) => (
            <div
              key={a.id}
              className="
                bg-white/70 backdrop-blur-xl
                border border-white/40
                rounded-2xl p-6
                shadow-[0_10px_25px_-10px_rgba(0,0,0,0.15)]
                hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <h3 className="text-lg font-semibold">
                {a.title}
              </h3>

              <div className="mt-2 text-sm text-[#6B7280] space-y-1">
                <p>Type: {a.type}</p>
                <p>Deadline: {a.deadline}</p>
                <p>Created: {a.createdAt}</p>
              </div>

              <span
                className={`inline-flex items-center gap-2 mt-4 text-xs font-semibold px-3 py-1.5 rounded-full
                  ${a.status === "PENDING"
                    ? "bg-red-100/80 text-red-700"
                    : "bg-green-100/80 text-green-700"
                  }`}
              >
                ● {a.status}
              </span>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2.5 rounded-xl border border-white/40 text-sm font-medium
                  bg-white/60 backdrop-blur hover:bg-white transition">
                  Instructions
                </button>
 
                <button
                  disabled={a.status === "SUBMITTED"}
                  onClick={() => router.push(`/student/assignments/${a.id}`)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition
                    ${a.status === "SUBMITTED"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#1E3A8A] text-white hover:brightness-110"
                    }`}
                >
                  Upload
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}
