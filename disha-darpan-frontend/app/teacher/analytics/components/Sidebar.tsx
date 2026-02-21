'use client';

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, Users2} from "lucide-react";

const items = [
  { label: "Dashboard", path: "/teacher/analytics", icon: LayoutDashboard },
  { label: "Student Analytics", path: "/teacher/analytics/student", icon: Users },
  { label: "Batch Analytics", path: "/teacher/analytics/batch", icon: Users2 },
  { label: "College Overview", path: "/teacher/analytics/college", icon: BarChart3 },
  { label: "Attendance", path: "/teacher/analytics/attendance", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-72 bg-[#0F172A] text-gray-400 flex flex-col justify-between">

      {/* BRAND */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#334499]">
          Disha Darpan
        </h1>
        <p>Analytics</p>

        <div className="mt-10 space-y-1">
        {items.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === path;
        // pathname === path ||
        // (path === "/teacher/analytics" && pathname.startsWith("/teacher/analytics"));

            return (
              <button
                key={path}
                onClick={() => router.push(path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 rounded-lg
                  transition
                  ${isActive
                    ? "bg-[#223dc3] text-white"
                    : "hover:bg-white/10"
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PROFILE */}
      <div className="p-6 border-t border-white/10">
       {/* BACK TO HOME */}
  <button
    onClick={() => router.push("/teacher/home")}
    className="
      w-full flex items-center gap-2
      px-3 py-2 rounded-lg
      text-sm font-medium
      text-[#334499]
      bg-white/5
      hover:bg-white/10
      transition
    "
    // icon: {house}
  >
    <span className="text-lg">←</span>
    Back to Home
  </button>

  
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFCC33] text-black flex items-center justify-center font-semibold">
            F
          </div>
          <div>
            <p className="text-sm text-white">Facilitator</p>
            <button className="text-xs text-red-400 hover:underline">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
