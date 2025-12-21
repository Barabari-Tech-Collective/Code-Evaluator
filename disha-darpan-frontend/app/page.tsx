'use client';
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg border">

        <h1 className="text-3xl font-semibold text-black text-center">
          Welcome to <span className="text-[#334449]">Code Evaluator</span>
        </h1>

        <p className="text-sm text-center text-black mt-3 opacity-70">
          A smart platform for assignment evaluation and growth.
        </p>

        <div className="my-8 h-px bg-gray-200" />

        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/select-role" })
          }
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                     bg-[#334449] text-black font-medium
                     hover:opacity-90 transition"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="bg-white rounded-full p-0.5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-center text-black mt-6 opacity-60">
          Internal academic evaluation platform
        </p>
      </div>
    </div>
  );
}
