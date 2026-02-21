"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get("mode");

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session) return;

    // Signup → role selection
    if (mode === "signup") {
      router.replace("/select-role");
      return;
    }

    if (!session.user?.role) {
      router.replace("/select-role");
      return;
    }

    const checkProfile = async () => {
      try {
        const endpoint =
          session.user.role === "FACILITATOR"
            ? "/facilitator/me"
            : "/student/me";

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${session.backendToken}`,
            },
          }
        );

        const data = await res.json();

        if (!data.exists) {
          router.replace(
            session.user.role === "FACILITATOR"
              ? "/teacher/onboard"
              : "/student/onboard"
          );
        } else {
          router.replace(
            session.user.role === "FACILITATOR"
              ? "/teacher/home"
              : "/student/home"
          );
        }
      } catch (err) {
        router.replace("/select-role");
      }
    };

    checkProfile();
  }, [session, status, router, mode]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  return <div className="min-h-screen flex items-center justify-center">Redirecting…</div>;
}