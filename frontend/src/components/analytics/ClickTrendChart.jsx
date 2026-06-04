import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ClickTrendChart({ data }) {
  return (
    <div className="bg-[#0f1511] border border-[#2f5e3b] p-6 rounded-2xl">
      <h2 className="text-[#7CFC00] text-xl font-bold mb-4">
        Click Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2f5e3b" />
          <XAxis dataKey="date" stroke="#9bbf9d" />
          <YAxis stroke="#9bbf9d" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#7CFC00"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}