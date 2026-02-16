'use client';
import { signOut, useSession } from "next-auth/react";
export default function ProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session } = useSession();

  if (!open) return null;

  const initial =
    session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* Glass Modal */}
      <div className="relative w-[90%] max-w-sm rounded-3xl
        bg-white/20 backdrop-blur-xl border border-white/30
        shadow-xl p-6 text-center text-[#111827]"
      >
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto rounded-full
          bg-[#1E3A8A] text-white text-3xl font-semibold
          flex items-center justify-center"
        >
          {initial}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-xl font-semibold">
          {session?.user?.name}
        </h3>

        <p className="text-sm opacity-70">
          {session?.user?.email}
        </p>

        {/* Progress */}
        <div className="mt-6 text-left">
          <p className="text-sm font-medium mb-1">
            Overall Progress
          </p>
          <div className="w-full h-2 rounded-full bg-white/40 overflow-hidden">
            <div
              className="h-full bg-[#FACC15]"
              style={{ width: "45%" }} // mock for now
            />
          </div>
          <p className="text-xs mt-1 opacity-70">
            45% completed
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {/* <button className="w-full py-2 rounded-xl
            bg-white/40 hover:bg-white/60 transition">
            Edit Profile
          </button> */}

          <button
            onClick={() => signOut()}
            className="w-full py-2 rounded-xl
              bg-red-500/80 text-white hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
