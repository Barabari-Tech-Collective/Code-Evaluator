import ChartRenderer from "../charts/ChartsRenderer";
import {
  STUDENT_PROGRESS_DATA,
  RUBRIC_BREAKDOWN_DATA,
  PEER_ASSIGNMENT_DATA,
  MULTI_STUDENT_TREND_DATA,
  STUDENT_DOMAIN_RADAR_DATA,
  DOMAIN_PEER_COMPARISON_DATA,
  COLLEGE_DOMAIN_ASSIGNMENT_DATA,
} from "../data/mockData";

export default function DynamicChart({ mode, filters, college, domain }) {
  let chartType = "EMPTY";
  let data: any[] = [];

  // 🟢 DASHBOARD MODE
  if (mode === "COLLEGE_DOMAIN_OVERVIEW") {
    chartType = "BAR";
    data = COLLEGE_DOMAIN_ASSIGNMENT_DATA[college]?.[domain] ?? [];
  }

  // 🟢 STUDENT ANALYTICS MODE
  else if (mode === "STUDENT_ANALYTICS") {
    const { students, domain, assignment } = filters;

    if (students.length === 1 && domain && !assignment) {
      chartType = "LINE";
      data = STUDENT_PROGRESS_DATA;
    }

    else if (students.length === 1 && domain && assignment) {
      chartType = "BAR";
      data = RUBRIC_BREAKDOWN_DATA;
    }

    else if (students.length > 1 && domain && assignment) {
      chartType = "GROUPED_BAR";
      data = PEER_ASSIGNMENT_DATA;
    }

    else if (students.length > 1 && domain && !assignment) {
      chartType = "MULTI_LINE";
      data = MULTI_STUDENT_TREND_DATA;
    }

    else if (students.length === 1 && !domain) {
      chartType = "RADAR";
      data = STUDENT_DOMAIN_RADAR_DATA;
    }

    else if (students.length > 1 && domain) {
      chartType = "BAR";
      data = DOMAIN_PEER_COMPARISON_DATA;
    }
  }

  return <ChartRenderer type={chartType} data={data} />;
}
