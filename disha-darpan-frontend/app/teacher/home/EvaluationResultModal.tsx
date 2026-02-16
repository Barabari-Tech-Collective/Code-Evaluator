type Props = {
  open: boolean;
  results: any[];
  onClose: () => void;
  onConfirm: () => void;
};

export default function EvaluationResultModal({
  open,
  results,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-3xl rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Evaluation Results (Preview)
        </h2>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Student</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.student}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Discard
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#334499] text-white text-sm"
          >
            Confirm & Save
          </button>
        </div>

      </div>
    </div>
  );
}
