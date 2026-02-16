export function resolveStudentChartHeading(filters: any) {
  const { students, domain, assignment } = filters;

  if (students.length === 1 && domain && !assignment)
    return "Student Progress Over Assignments";

  if (students.length === 1 && domain && assignment)
    return "Rubric-wise Performance Breakdown";

  if (students.length > 1 && domain && assignment)
    return "Peer Comparison on Assignment";

  if (students.length > 1 && domain && !assignment)
    return "Batch Performance Trend";

  if (students.length === 1 && !domain)
    return "Student Skill Profile Across Domains";

  if (students.length > 1 && domain)
    return "Domain-wise Peer Comparison";

  return "Select filters to view analytics";
}
