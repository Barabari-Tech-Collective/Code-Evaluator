'use client';

type Props = {
  college?: string;
  onCollegeChange?: (college: string) => void;
};

export default function TopBar({ college, onCollegeChange }: Props) {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-white">

      {/* LEFT SIDE */}
      <div>
        <h2 className="text-lg font-semibold text-black">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of Student Performance
        </p>
      </div>

      {/* RIGHT SIDE */}
      <select
        value={college}
        onChange={(e) => onCollegeChange?.(e.target.value)}
        className="
          px-4 py-2 rounded-lg text-sm
          bg-gray-50 border
          focus:outline-none
          focus:ring-2 focus:ring-[#334499]
        "
      >
        <option value="City College">City College</option>
        <option value="Begumpet">Begumpet</option>
        <option value="HussainiAlam">HussainiAlam</option>
      </select>

    </header>
  );
}


// export default function TopBar({ college, onCollegeChange }: Props) {
//   return (
//     <header className="h-16 px-6 flex items-center justify-end bg-white">
//       <h2>Dashboard</h2>
//       <p>Overview of Student Performance</p>
//       <select
//         value={college}
//         onChange={(e) => onCollegeChange?.(e.target.value)}
//         className="
//           px-4 py-2 rounded-lg text-sm
//           bg-gray-50
//           focus:outline-none
//           focus:ring-2 focus:ring-[#334499]
//         "
//       >
//         <option value="City College">City College</option>
//         <option value="Begumpet">Begumpet</option>
//         <option value="HussainiAlam">HussainiAlam</option>
//       </select>
//     </header>
//   );
// }
