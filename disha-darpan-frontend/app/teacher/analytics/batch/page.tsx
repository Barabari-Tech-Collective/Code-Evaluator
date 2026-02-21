'use client';

import { useState } from "react";
import ChartCard from "../components/ChartCard";
import ChartRenderer from "../charts/ChartsRenderer";
import TopBar from "../components/TopBar";
import BatchFilters from "../components/BatchFilters";
import {
  BATCH_ASSIGNMENT_COMPARISON,
  BATCH_MULTI_ASSIGNMENT_TREND,
} from "../data/mockData";


type Domain = keyof typeof BATCH_ASSIGNMENT_COMPARISON;
type Assignment =
keyof (typeof BATCH_ASSIGNMENT_COMPARISON)[Domain];


type Filters = {
  student1: string;
  student2: string;
  student3: string;
  domain: Domain;
  assignment: Assignment | "";
};

type StudentName = Exclude<
keyof (typeof BATCH_MULTI_ASSIGNMENT_TREND)[Domain][number],
"assignment"
>;



export default function BatchAnalyticsPage() {
  const [college, setCollege] = useState("City College");
  const [filters, setFilters] = useState<Filters>({
    student1: "Asiya",
    student2: "Rahul",
    student3: "",
    domain: "JavaScript",
    assignment: "",
  });
  
  let chartType = "EMPTY";
  let chartData: any[] = [];
  let title = "Batch Analytics";
  
  //helper
  const selectedStudents = [
    filters.student1,
    filters.student2,
  filters.student3,
].filter(Boolean) as StudentName[];


  // CASE 1: Multiple students → same assignment
  if (selectedStudents.length > 1 && filters.domain && filters.assignment) {
    title = "Peer Comparison on Assignment";
    chartType = "BAR";
    
    chartData =
    BATCH_ASSIGNMENT_COMPARISON[filters.domain]?.[filters.assignment]?.filter((d): d is typeof d & { student: StudentName } => selectedStudents.includes(d.student as StudentName)).map(
      (d) => ({
        x: d.student,
        y: d.score,
      })
    ) ?? [];
  }
  
  // CASE 2: Multiple students → multiple assignments
  else if (selectedStudents.length > 1 && filters.domain) {
    title = "Batch Performance Trend";
    chartType = "MULTI_LINE";

    // chartData =
    //   BATCH_MULTI_ASSIGNMENT_TREND[filters.domain]?.map((row) => ({
    //     x: row.assignment,
    //     ...row,
    //   })) ?? [];
    chartData = BATCH_MULTI_ASSIGNMENT_TREND[filters.domain]?.map(row => {
    const filtered: Record<string, number | string> = { x: row.assignment };
    selectedStudents.forEach(s => {
      filtered[s] = row[s];
    });
    return filtered;
  }) ?? [];
  }

  // CASE 3: Domain-wise normalized comparison
  // else if (selectedStudents.length > 1 && filters.domain) {
  //   title = "Domain-wise Peer Comparison";
  //   chartType = "BAR";

  //   chartData =
  //     DOMAIN_NORMALIZED_BATCH[filters.domain]?.map((d) => ({
  //       x: d.student,
  //       y: d.score,
  //     })) ?? [];
  // }

  return (
    <div className="flex-1 bg-white p-6 space-y-6">

      <TopBar college={college} onCollegeChange={setCollege} />

      <div>
        <h1 className="text-2xl font-semibold text-[#334499]">
          Batch Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Compare performance across students and assignments
        </p>
      </div>

      <ChartCard
        title={title}
        rightSlot={
          <BatchFilters filters={filters} setFilters={setFilters} />
        }
      >
        <ChartRenderer type={chartType} data={chartData} />
      </ChartCard>

    </div>
  );
}
