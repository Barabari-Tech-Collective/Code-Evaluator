type Props = {
  title: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function ChartCard({ title, children, rightSlot }: Props) {
  return (
    <div
      className="
        bg-white rounded-2xl p-6
        border border-gray-100
        shadow-sm
      "
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-sm text-gray-700">
          {title}
        </h3>
        {rightSlot}
      </div>

      {children}
    </div>
  );
}
