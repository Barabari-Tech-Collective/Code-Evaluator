import StudentSelect from "./StudentSelect";
import { DOMAIN_ASSIGNMENT_DATA } from "../data/mockData";

export default function BatchFilters({ filters, setFilters }: any) {
  const domains = Object.keys(DOMAIN_ASSIGNMENT_DATA);
  const assignments =
    filters.domain
      ? DOMAIN_ASSIGNMENT_DATA[filters.domain as keyof typeof DOMAIN_ASSIGNMENT_DATA]?.map(a => a.x)
      : [];

  return (
    <div className="flex gap-6 items-end">

      {/* STUDENTS */}
      <StudentSelect
        label="Student 1"
        value={filters.student1}
        onChange={(v) =>
          setFilters((p: any) => ({ ...p, student1: v }))
        }
      />

      <StudentSelect
        label="Student 2"
        value={filters.student2}
        onChange={(v) =>
          setFilters((p: any) => ({ ...p, student2: v }))
        }
      />

      <StudentSelect
        label="Student 3"
        value={filters.student3}
        onChange={(v) =>
          setFilters((p: any) => ({ ...p, student3: v }))
        }
      />

      {/* DOMAIN */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Domain</p>
        <select
          value={filters.domain}
          onChange={(e) =>
            setFilters((p: any) => ({
              ...p,
              domain: e.target.value,
              assignment: "",
            }))
          }
          className="px-3 py-2 rounded-lg bg-gray-50 text-sm w-40"
        >
          {domains.map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* ASSIGNMENT */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Assignment</p>
        <select
          value={filters.assignment}
          onChange={(e) =>
            setFilters((p: any) => ({ ...p, assignment: e.target.value }))
          }
          className="px-3 py-2 rounded-lg bg-gray-50 text-sm w-40"
        >
          <option value="">All</option>
          {assignments.map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

    </div>
  );
}
