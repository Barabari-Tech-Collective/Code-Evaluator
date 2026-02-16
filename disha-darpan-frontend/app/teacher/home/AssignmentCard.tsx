type Props = {
  assignment: {
    title: string;
    domain: string;
    type: string;
    submissions: number;
  };
};

export default function AssignmentCard({ assignment, onEvaluate }: Props & { onEvaluate: (assignment: any) => void }) {
  return (
    <div className="rounded-2xl p-6 bg-white/70 backdrop-blur border
                    shadow-sm hover:shadow-md transition">

      <h3 className="text-lg font-semibold">
        {assignment.title}
      </h3>

      <div className="mt-2 text-sm opacity-70 space-y-1">
        <p>Domain: {assignment.domain}</p>
        <p>Type: {assignment.type}</p>
        <p>Submissions: {assignment.submissions}</p>
      </div>

      <button
        onClick={() => onEvaluate(assignment)}
        className="mt-5 w-full py-2 rounded-lg
                   bg-[#FFCC33] font-medium
                   hover:opacity-90 transition"
      >
        Evaluate Submissions
      </button>
    </div>
  );
}
