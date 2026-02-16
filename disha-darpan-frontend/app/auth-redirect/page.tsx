'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get("mode"); // signup | login

  useEffect(() => {
    if (status !== "authenticated") return;

    // Signup always goes to role selection
    if (mode === "signup") {
      router.replace("/select-role");
      return;
    }

    // Login logic
    if (!session?.user?.role) {
      router.replace("/select-role");
      return;
    }

    if (session.user.role === "STUDENT") {
      router.replace("/student/home");
      return;
    }

    if (session.user.role === "FACILITATOR") {
      router.replace("/teacher/home");
    }
  }, [session, status, router, mode]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting…</div>;
}
