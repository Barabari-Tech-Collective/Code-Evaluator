type Props = {
  value: string;
  onChange: (student: string) => void;
};
import { STUDENT_LIST } from "../data/mockData";


// const STUDENTS = ["Asiya", "Rahul", "Aman"];

export default function StudentSingleSelect({ value, onChange }: Props) {
  return (
    <div>
      <h4 className="text-gray-500 mb-1">Student</h4>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg bg-gray-50 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#334499]"
      >
        {STUDENT_LIST.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
