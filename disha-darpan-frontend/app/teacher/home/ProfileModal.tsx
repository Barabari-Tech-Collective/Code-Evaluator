import { signOut } from "next-auth/react"

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-6 w-80">

        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> Facilitator</p>
          <p><strong>Role:</strong> Facilitator</p>
        </div>

        <button className="mt-4 w-full py-2 rounded-lg border">
          Edit Profile
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-2 w-full py-2 rounded-lg bg-[#334499] text-white">
          Logout
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-sm opacity-70"
        >
          Close
        </button>
      </div>
    </div>
  );
}
