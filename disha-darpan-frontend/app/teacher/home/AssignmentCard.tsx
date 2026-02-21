type Props = {
  assignment: {
    id: string;
    title: string;
    subject: string;
    type: string;
    submissions: number;
  };
  onEvaluate: (assignment: any) => void;
};

export default function AssignmentCard({ assignment, onEvaluate }: Props) {
  const isDisabled = assignment.submissions === 0;

  return (
    <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-gray-200 shadow-sm hover:shadow-md transition">

      <h3 className="text-lg font-semibold">
        {assignment.title}
      </h3>

      <div className="mt-2 text-sm opacity-70 space-y-1">
        <p>Subject: {assignment.subject}</p>
        <p>Type: {assignment.type}</p>
        <p>Submissions: {assignment.submissions}</p>
      </div>

      <button
        disabled={isDisabled}
        onClick={() => onEvaluate(assignment)}
        className={`mt-5 w-full py-2 rounded-lg font-medium transition
          ${isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#FFCC33] hover:opacity-90"
          }`}
      >
        {isDisabled ? "No Submissions Yet" : "Evaluate Submissions"}
      </button>
    </div>
  );
}