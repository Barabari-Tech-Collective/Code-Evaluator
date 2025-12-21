'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const COLLEGES = [
  "City College",
  "Begumpet College",
  "Hussaini Alam College",
];

export default function FacilitatorOnboardPage() {
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleCollege = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college)
        ? prev.filter((c) => c !== college)
        : [...prev, college]
    );
  };

  const handleSubmit = async () => {
    if (!session?.user?.email || !session.backendToken) return;
    try {
      await apiFetch(
        "/facilitator/onboard",
        {
          method: "POST",
          body: JSON.stringify({
            email: session.user.email,
            colleges: selectedColleges,
          }),
        },
        session.backendToken
      );
        router.push("/facilitator/home");
    } catch (err: any) {
        alert(err.message);
    }
};

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">

      {/* LEFT — Illustration */}
      <div className="hidden md:flex items-center justify-center bg-[#334499]">
        <div className="text-center px-10">
          <div className="w-32 h-32 mx-auto rounded-full bg-[#FFCC33] mb-6" />
          <h2 className="text-3xl font-semibold text-black">
            Facilitator Setup
          </h2>
          <p className="text-black mt-3 opacity-80">
            Assign colleges to manage students and evaluations efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-black">
            Select Assigned Colleges
          </h1>

          <p className="text-sm text-black mt-2 opacity-70">
            You can manage multiple colleges
          </p>

          {/* Tiles */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            {COLLEGES.map((college) => {
              const isSelected = selectedColleges.includes(college);

              return (
                <div
                  key={college}
                  onClick={() => toggleCollege(college)}
                  className={`cursor-pointer p-4 rounded-xl border transition
                    ${isSelected
                      ? "border-[#334499] bg-[#FFCC33]"
                      : "hover:border-[#334499]"
                    }`}
                >
                  <p className="text-black font-medium">
                    {college}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <button
            disabled={selectedColleges.length === 0}
            onClick={handleSubmit}
            className={`w-full mt-8 py-3 rounded-xl font-medium transition
              ${selectedColleges.length === 0
                ? "bg-gray-200 text-black opacity-60 cursor-not-allowed"
                : "bg-[#334499] text-black hover:opacity-90"
              }`}
          >
            Complete Onboarding
          </button>

          <p className="text-xs text-black mt-4 opacity-60 text-center">
            You can update this later if needed
          </p>
        </div>
      </div>
    </div>
  );
}
