import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DeviceChart({ data }) {
  return (
    <div className="bg-[#0f1511] border border-[#2f5e3b] p-6 rounded-2xl">
      <h2 className="text-[#7CFC00] text-xl font-bold mb-4">
        Device Usage
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="device" stroke="#9bbf9d" />
          <YAxis stroke="#9bbf9d" />
          <Tooltip />
          <Bar dataKey="value" fill="#7CFC00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}