'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";

export default function StudentOnboardPage() {

  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email || !session.backendToken) return;

    try {
      setLoading(true);

      await apiFetch(
        "/student/onboard",
        {
          method: "POST",
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            college,
            course,
          }),
        },
        session.backendToken
      );

      router.push("/student/home");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }

    console.log({ name, college, course });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-lg p-8 rounded-2xl border shadow-lg">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-black text-center">
          Student Onboarding
        </h1>

        <p className="text-sm text-black text-center mt-2 opacity-70">
          Tell us a bit about yourself to continue
        </p>

        {/* Accent line */}
        <div className="w-16 h-1 bg-[#FFCC33] rounded-full mx-auto mt-4" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border
                         focus:outline-none focus:ring-2
                         focus:ring-[#334499]"
            />
          </div>

          {/* College */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              College
            </label>
            <select
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-[#334499]"
            >
              <option value="">Select your college</option>
              <option value="City College">City College</option>
              <option value="Begumpet College">Begumpet College</option>
              <option value="Hussaini Alam College">Hussaini Alam College</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Course
            </label>
            <select
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-white
                         focus:outline-none focus:ring-2
                         focus:ring-[#334499]"
            >
              <option value="">Select your course</option>
              <option value="BCom">BCom</option>
              <option value="BSc AI/ML">BSc AI / ML</option>
              <option value="BSc MSDS">BSc MSDS</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-6 py-3 rounded-xl font-medium
                       bg-[#334499] text-black
                       hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Footer hint */}
        <p className="text-xs text-center text-black mt-6 opacity-60">
          This information helps us assign the right assignments to you
        </p>
      </div>
    </div>
  );
}
