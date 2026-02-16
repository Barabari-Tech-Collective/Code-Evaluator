type Props = {
  open: boolean;
  assignment: any;
  onClose: () => void;
  onRun: () => void;
};

export default function RunEvaluationModal({
  open,
  assignment,
  onClose,
  onRun,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">

        <h2 className="text-lg font-semibold">
          Run Evaluation
        </h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Assignment:</b> {assignment.title}</p>
          <p><b>Evaluator:</b> {assignment.evaluator}</p>
          <p><b>Submissions:</b> {assignment.submissions}</p>
        </div>

        <p className="text-xs text-red-500 mt-2">
          This will run AI evaluation on all submissions.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onRun}
            className="px-4 py-2 rounded-lg bg-[#334499] text-white text-sm"
          >
            Run Evaluation
          </button>
        </div>

      </div>
    </div>
  );
}
