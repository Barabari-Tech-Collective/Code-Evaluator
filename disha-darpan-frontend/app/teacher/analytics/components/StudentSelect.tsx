type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const STUDENTS = [
  "Asiya",
  "Rahul",
  "Aman",
  "Student 4",
  "Student 5",
];

export default function StudentSelect({ label, value, onChange }: Props) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg bg-gray-50 text-sm w-40
                   focus:outline-none focus:ring-2 focus:ring-[#334499]"
      >
        <option value="">None</option>
        {STUDENTS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
