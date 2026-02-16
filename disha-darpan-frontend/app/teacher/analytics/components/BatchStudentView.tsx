'use client';

import ChartCard from "./ChartCard";
import ChartRenderer from "../charts/ChartsRenderer";
import {
  BATCH_ASSIGNMENT_COMPARISON,
  BATCH_MULTI_ASSIGNMENT_TREND,
  DOMAIN_NORMALIZED_BATCH,
} from "../data/mockData";

type Props = {
  filters: any;
};

export default function BatchStudentView({ filters }: Props) {
  const { students, domain, assignment } = filters;

  let chartType = "EMPTY";
  let data: any[] = [];
  let title = "Batch Analytics";

  // CASE 3: Same assignment
  if (students.length > 1 && domain && assignment) {
    chartType = "GROUPED_BAR";
    title = "Peer Comparison on Assignment";

    data =
      BATCH_ASSIGNMENT_COMPARISON[domain]?.[assignment]?.map(d => ({
        x: d.student,
        y: d.score,
      })) ?? [];
  }

  // CASE 4: Multi assignment trend
  else if (students.length > 1 && domain && !assignment) {
    chartType = "MULTI_LINE";
    title = "Batch Performance Trend";

    data =
      BATCH_MULTI_ASSIGNMENT_TREND[domain]?.map(row => ({
        x: row.assignment,
        ...row,
      })) ?? [];
  }

  // CASE 6: Domain normalized
  else if (students.length > 1 && domain) {
    chartType = "BAR";
    title = "Domain-wise Peer Comparison";

    data =
      DOMAIN_NORMALIZED_BATCH[domain]?.map(d => ({
        x: d.student,
        y: d.score,
      })) ?? [];
  }

  if (data.length === 0) return null;

  return (
    <ChartCard title={title}>
      <ChartRenderer type={chartType} data={data} />
    </ChartCard>
  );
}
