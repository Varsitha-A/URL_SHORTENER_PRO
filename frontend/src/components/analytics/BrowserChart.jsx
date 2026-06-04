import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#7CFC00", "#4caf50", "#2f5e3b", "#1a2f1f"];

export default function BrowserChart({ data }) {
  return (
    <div className="bg-[#0f1511] border border-[#2f5e3b] p-6 rounded-2xl">
      <h2 className="text-[#7CFC00] text-xl font-bold mb-4">
        Browser Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="browser"
            outerRadius={110}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}