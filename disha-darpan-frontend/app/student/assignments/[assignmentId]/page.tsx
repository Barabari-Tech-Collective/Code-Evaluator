'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";

export default function AssignmentDetailsPage() {
  const { assignmentId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [assignment, setAssignment] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH ASSIGNMENT ---------------- */
  useEffect(() => {
    if (!session?.backendToken) return;

    const fetchAssignment = async () => {
      try {
        const data = await apiFetch(
          `/assignments/${assignmentId}`,
          { method: "GET" },
          session.backendToken ?? undefined
        );
        setAssignment(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAssignment();
  }, [assignmentId, session]);

  /* ---------------- FILE HANDLERS ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !session?.backendToken) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await apiFetch(
        `/submissions/${assignmentId}`,
        {
          method: "POST",
          body: formData,
        },
        session.backendToken
      );

      alert("Assignment submitted successfully ✅");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!assignment) return <div className="p-6">Loading...</div>;

  const isDeadlinePassed =
    new Date(assignment.deadline).getTime() < Date.now();

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-black">
        {assignment.title}
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Domain: <span className="font-medium">{assignment.domain}</span>
      </p>

      {/* META INFO */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Evaluator Type</p>
          <p className="font-medium">{assignment.evaluatorType}</p>
        </div>

        <div>
          <p className="text-gray-500">Deadline</p>
          <p
            className={`font-medium ${
              isDeadlinePassed ? "text-red-600" : ""
            }`}
          >
            {new Date(assignment.deadline).toLocaleString()}
          </p>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      {assignment.instructionUrl && (
        <a
          href={assignment.instructionUrl}
          target="_blank"
          className="inline-block mt-6 text-sm font-medium text-blue-600"
        >
          📄 View Instruction Document
        </a>
      )}

      {/* UPLOAD SECTION */}
      <div className="mt-10 border rounded-xl p-6 bg-gray-50">

        <h3 className="text-lg font-semibold text-black">
          Upload Your Project
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Upload a ZIP file (Max 100MB)
        </p>

        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          disabled={isDeadlinePassed}
          className="mt-4 block w-full text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading || isDeadlinePassed}
          className="mt-6 px-6 py-2 rounded-lg bg-black text-white text-sm disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit Assignment"}
        </button>

        {isDeadlinePassed && (
          <p className="mt-3 text-sm text-red-600">
            Deadline crossed. Upload disabled.
          </p>
        )}
      </div>
    </div>
  );
}
