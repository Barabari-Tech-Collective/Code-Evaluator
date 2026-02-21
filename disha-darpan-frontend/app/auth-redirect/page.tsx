"use client";

import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectLogic() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const mode = params.get("mode");

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session) return;

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
      } catch {
        router.replace("/select-role");
      }
    };

    checkProfile();
  }, [session, status, router, mode]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting…</div>;
}

export default function AuthRedirectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <RedirectLogic />
    </Suspense>
  );
}