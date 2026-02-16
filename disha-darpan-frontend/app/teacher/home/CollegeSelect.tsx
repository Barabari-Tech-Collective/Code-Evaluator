type Props = {
  colleges: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function CollegeSelect({ colleges, selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 rounded-xl border
                 bg-white text-black
                 focus:outline-none focus:ring-2 focus:ring-[#334499]"
    >
      {colleges.map(c => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
