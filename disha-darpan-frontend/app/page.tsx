'use client';
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-[#334499] px-6">

      <div className="max-w-md w-full p-10 rounded-3xl 
                      bg-white shadow-xl border border-gray-100">

        {/* Logo / Title */}
        <h1 className="text-3xl font-semibold text-center text-[#334499]">
          Welcome to{" "}
          <span className="text-[#334499]">
            Code Evaluator
          </span>
        </h1>

        <p className="text-sm text-center text-gray-500 mt-3">
          Smart AI-powered assignment evaluation platform
        </p>

        <div className="my-8 h-px bg-gray-200" />

        {/* Signup */}
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/auth-redirect?mode=signup" })
          }
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                     bg-[#334499] text-white font-medium
                     hover:opacity-95 hover:scale-[1.02]
                     transition-all duration-200"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={18}
            height={18}
            className="bg-white rounded-full p-1"
          />
          Sign up with Google
        </button>

        {/* Login */}
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/auth-redirect?mode=login" })
          }
          className="w-full mt-4 flex items-center justify-center gap-3 py-3 rounded-xl
                     border border-gray-300 text-black font-medium
                     hover:bg-gray-50
                     transition"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={18}
            height={18}
          />
          Login with Google
        </button>

        <p className="text-xs text-center text-gray-400 mt-8">
          Internal academic evaluation system
        </p>

      </div>
    </div>
  );
}
