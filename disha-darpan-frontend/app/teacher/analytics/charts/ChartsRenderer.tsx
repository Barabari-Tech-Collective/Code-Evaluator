import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line,
  RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend
} from "recharts";

type Props = {
  type: string;
  data: any[];
};

export default function ChartRenderer({ type, data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        Select filters to view analytics
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>

      {type === "LINE" && (
        <LineChart data={data}>
          <XAxis
            dataKey="x"
            label={{ value: "Assignments", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Score", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            dataKey="y"
            stroke="#334499"
            strokeWidth={3}
          />
        </LineChart>
      )}

      {type === "BAR" && (
        <BarChart data={data}>
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="y" fill="#334499" />
        </BarChart>
      )}

      {type === "GROUPED_BAR" && (
        <BarChart data={data}>
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="y" fill="#334499" />
        </BarChart>
      )}

      {type === "RADAR" && (
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis />
          <Radar
            dataKey="value"
            stroke="#334499"
            fill="#FFCC33"
            fillOpacity={0.6}
          />
          <Tooltip/>
        </RadarChart>
      )}
  {type === "BAR_COMPARE" && (
    <BarChart data={data}>
      <XAxis dataKey="domain" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="student" fill="#334499" />
      <Bar dataKey="class" fill="#FFCC33" />
    </BarChart>
  )}

  {type === "MULTI_LINE" && (
  <LineChart data={data}>
    <XAxis dataKey="x" />
    <YAxis />
    <Tooltip />
    <Legend />

    {/* Dynamically render lines for each student */}
    {Object.keys(data[0] || {})
      .filter(key => key !== "x")
      .map((key, idx) => (
        <Line
          key={key}
          dataKey={key}
          stroke={["#334499", "#FFCC33", "#22C55E"][idx % 3]}
          strokeWidth={2}
        />
      ))}
  </LineChart>
)}

    </ResponsiveContainer>
  );
}
