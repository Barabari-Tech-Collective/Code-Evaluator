'use client';
import TopBar from "./components/TopBar";
import StatCard from "./components/StatCard";
import DynamicChart from "./components/DynamicChart";
import ChartCard from "./components/ChartCard";
import { useState } from "react";

export default function DashboardPage() {
  const [college, setCollege] = useState("City College");
  const [domain, setDomain] = useState("JavaScript");

  return (
    <div className="flex-1 bg-white p-6 space-y-6">

      <TopBar college={college} onCollegeChange={setCollege} />

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6">
        <StatCard title="Total Students" value="120" />
        <StatCard title="Total Assignments" value="32" />
      </div>

      {/* DOMAIN OVERVIEW */}
      {/* <DynamicChart
        mode="COLLEGE_DOMAIN_OVERVIEW"
        college={college}
        domain={domain}
        onDomainChange={setDomain}
      /> */}
      {/* DOMAIN LEVEL OVERVIEW */}
<ChartCard
  title="Domain Level Overview"
  rightSlot={
    <select
      value={domain}
      onChange={(e) => setDomain(e.target.value)}
      className="px-3 py-1 rounded-md text-sm bg-gray-50 border"
    >
      <option>HTML</option>
      <option>CSS</option>
      <option>JavaScript</option>
      <option>React</option>
      <option>Backend</option>
    </select>
  }
>
  <DynamicChart
    mode="COLLEGE_DOMAIN_OVERVIEW"
    college={college}
    domain={domain}
  />
</ChartCard>
    </div>
  );
}
