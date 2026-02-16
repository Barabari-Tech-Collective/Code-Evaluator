'use client';

type Props = {
  filters: any;
  setFilters: (fn: any) => void;
};

export default function StudentChartFilters({ filters, setFilters }: Props) {
  return (
    <div className="flex gap-4">

  <div>
    <p className="text-xs text-gray-500 mb-1">Students</p>
    <select multiple className="px-3 py-2 rounded-lg bg-gray-50 text-sm">
      <option>Asiya</option>
      <option>Rahul</option>
      <option>Aman</option>
    </select>
  </div>

  <div>
    <p className="text-xs text-gray-500 mb-1">Domain</p>
    <select className="px-3 py-2 rounded-lg bg-gray-50 text-sm">
      <option>All</option>
      <option>JavaScript</option>
      <option>React</option>
    </select>
  </div>

  <div>
    <p className="text-xs text-gray-500 mb-1">Assignment</p>
    <select className="px-3 py-2 rounded-lg bg-gray-50 text-sm">
      <option>All</option>
      <option>Assignment 1</option>
      <option>Assignment 2</option>
    </select>
  </div>

</div>

  );
}
