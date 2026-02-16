type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div
      className="
        rounded-2xl p-6
        bg-white
        border border-gray-100
        shadow-sm
      "
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2 text-[#334499]">
        {value}
      </h2>
    </div>
  );
}
