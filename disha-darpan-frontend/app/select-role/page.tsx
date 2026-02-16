'use client';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";

export default function SelectRolePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  if (status === "loading") {
  return <div>Loading...</div>;
  }

  if (!session || !session.backendToken) {
    return <div>Unauthorized</div>;
  }
  const handleSelect = async (role: "STUDENT" | "FACILITATOR") => {
    // TODO: Save role to DB via API
    console.log("Selected role:", role);
    // await fetch("/api/user/role", { method: "POST", body: JSON.stringify({ role }) })
    if (!session?.user?.email || !session.backendToken){
        alert("User session not found.")
        return
    } 

    try {
      const data = await apiFetch(
        "/user/role",
        {
          method: "POST",
          body: JSON.stringify({
            // email: session.user.email,
            role,
          }),
        },
        session.backendToken
      );
      

  await update({
    backendToken: data.token,
    user: { role: data.user.role },
  });
      // Redirect after role saved
      router.replace("/auth-redirect?mode=login")
    } catch (err: any) {
      alert(err.message || "Failed to save role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-3xl w-full p-8">

        <h2 className="text-3xl font-semibold text-black text-center">
          Select Your Role
        </h2>

        <p className="text-sm text-center text-black mt-2 opacity-70">
          This helps us tailor your experience
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Student Card */}
          <div
            onClick={() => handleSelect("STUDENT")}
            className="cursor-pointer p-8 rounded-2xl border shadow-sm
                       hover:shadow-lg transition group"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffcc33] mb-4" />

            <h3 className="text-xl font-semibold text-black">
              Student
            </h3>

            <p className="text-sm text-black mt-2 opacity-70">
              Submit assignments, view evaluations, and track progress.
            </p>

            <span className="inline-block mt-4 text-sm font-medium text-[#334449]">
              Continue →
            </span>
          </div>

          {/* Facilitator Card */}
          <div
            onClick={() => handleSelect("FACILITATOR")}
            className="cursor-pointer p-8 rounded-2xl border shadow-sm
                       hover:shadow-lg transition group"
          >
            <div className="w-12 h-12 rounded-full bg-[#334449] mb-4" />

            <h3 className="text-xl font-semibold text-black">
              Facilitator
            </h3>

            <p className="text-sm text-black mt-2 opacity-70">
              Create assignments, review submissions, and manage evaluations.
            </p>

            <span className="inline-block mt-4 text-sm font-medium text-[#334449]">
              Continue →
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
