type Props = {
  title: string;
  value: string;
};

export default function InsightCard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-[#334499] mt-1">
        {value}
      </p>
    </div>
  );
}
