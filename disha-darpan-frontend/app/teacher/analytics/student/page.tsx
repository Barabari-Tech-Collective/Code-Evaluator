'use client';

import { useState } from "react";
import IndividualStudentView from "../components/IndividualStudentView";
import BatchStudentView from "../components/BatchStudentView";
import StudentSingleSelect from "../components/StudentSingleSelect";

export default function StudentAnalyticsPage() {
  const [filters, setFilters] = useState({
    students: ["Asiya"],
    domain: "JavaScript",
    assignment: null,
  });

  return (
    <div className="flex-1 bg-white p-6 space-y-8">

      <h1 className="text-2xl font-semibold text-[#334499]">
        Student Analytics
      </h1>

      {/* STUDENT SELECT */}
      <StudentSingleSelect
        value={filters.students[0]}
        onChange={(student) =>
          setFilters({
            ...filters,
            students: [student],
          })
        }
      />

      {/* INDIVIDUAL VIEW */}
      {filters.students.length === 1 && (
        <IndividualStudentView
          student={filters.students[0]}
          domain={filters.domain}
        />
      )}

      {/* BATCH VIEW */}
      {filters.students.length > 1 && (
        <BatchStudentView filters={filters} />
      )}

    </div>
  );
}
