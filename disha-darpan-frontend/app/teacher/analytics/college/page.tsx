'use client';

import { useState } from "react";
import ChartCard from "../components/ChartCard";
import ChartRenderer from "../charts/ChartsRenderer";
import {
  COLLEGE_DOMAIN_ASSIGNMENT_DATA,
  CROSS_COLLEGE_DOMAIN_DATA,
  COLLEGE_DOMAIN_OVERVIEW,
} from "../data/mockData";

type College = keyof typeof COLLEGE_DOMAIN_ASSIGNMENT_DATA;

type Domain = keyof (typeof COLLEGE_DOMAIN_ASSIGNMENT_DATA)[College];
type CrossCollegeDomain = keyof typeof CROSS_COLLEGE_DOMAIN_DATA;



const COLLEGES = ["City College", "Begumpet", "HussainiAlam"];
const DOMAINS = ["HTML", "CSS", "JavaScript", "React", "Backend"];

type Mode = "DOMAIN_ASSIGNMENTS" | "CROSS_COLLEGE" | "DOMAIN_OVERVIEW";

export default function CollegeAnalyticsPage() {
  const [college, setCollege] = useState<College>("City College");
  const [domain, setDomain] = useState<Domain>("JavaScript");
  const [mode, setMode] = useState<Mode>("DOMAIN_ASSIGNMENTS");

  let chartType = "BAR";
  let data: any[] = [];
  let title = "";

  // ===== CASE 7
  if (mode === "DOMAIN_ASSIGNMENTS") {
    title = "College Performance per Assignment";
    data =
      COLLEGE_DOMAIN_ASSIGNMENT_DATA[college]?.[domain] ?? [];
  }

  // ===== CASE 8
  // if (mode === "CROSS_COLLEGE") {
  //   title = "Cross College Comparison";
  //   data =
  //     CROSS_COLLEGE_DOMAIN_DATA[domain] ?? [];
  // }
  if (mode === "CROSS_COLLEGE") {
  title = "Cross College Comparison";

  if (domain in CROSS_COLLEGE_DOMAIN_DATA) {
    data =
      CROSS_COLLEGE_DOMAIN_DATA[
        domain as CrossCollegeDomain
      ] ?? [];
  }
}


  // ===== CASE 9
  if (mode === "DOMAIN_OVERVIEW") {
    title = "Domain-wise College Performance";
    data =
      COLLEGE_DOMAIN_OVERVIEW[college] ?? [];
  }

  return (
    <div className="flex-1 bg-white p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[#334499]">
          College Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Performance insights across colleges and domains
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-6 items-end">

        <div>
          <p className="text-xs text-gray-500 mb-1">College</p>
          <select
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-50 text-sm"
          >
            {COLLEGES.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Domain</p>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-50 text-sm"
          >
            {DOMAINS.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">View</p>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="px-3 py-2 rounded-lg bg-gray-50 text-sm"
          >
            <option value="DOMAIN_ASSIGNMENTS">
              Domain → Assignments
            </option>
            <option value="CROSS_COLLEGE">
              Cross College
            </option>
            <option value="DOMAIN_OVERVIEW">
              Domain Overview
            </option>
          </select>
        </div>

      </div>

      {/* CHART */}
      <ChartCard title={title}>
        <ChartRenderer type={chartType} data={data} />
      </ChartCard>

    </div>
  );
}
