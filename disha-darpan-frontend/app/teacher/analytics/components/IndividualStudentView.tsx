'use client';

import ChartCard from "./ChartCard";
import ChartRenderer from "../charts/ChartsRenderer";
import InsightCard from "./InsightCard";
import { STUDENT_DATA_BY_NAME } from "../data/mockData";

type Props = {
  student: string;
};

export default function IndividualStudentView({ student }: Props) {
  const studentData = STUDENT_DATA_BY_NAME[student];

  if (!studentData){
    return <div className="text-red-500">Student data not found</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-black">
          {student}
        </h2>
      </div>

      {/* STUDENT VS CLASS */}
      <ChartCard title="Student vs Class Average (Domain-wise)">
        <ChartRenderer
          type="BAR_COMPARE"
          data={studentData.class}
        />
      </ChartCard>

      {/* RADAR + INSIGHTS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <ChartCard title="Skill Profile">
            <ChartRenderer
              type="RADAR"
              data={studentData.radar}
            />
          </ChartCard>
        </div>

        <div className="space-y-4">
          <InsightCard
            title="Strongest Domain"
            value={studentData.insights.strong}
          />
          <InsightCard
            title="Needs Improvement"
            value={studentData.insights.weak}
          />
          <InsightCard
            title="Overall Consistency"
            value={studentData.insights.consistency}
          />
        </div>

      </div>

    </div>
  );
}
