import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#7CFC00", "#2f5e3b", "#1a2f1f", "#4caf50"];

export default function CountryChart({ data }) {
  return (
    <div className="bg-[#0f1511] border border-[#2f5e3b] p-6 rounded-2xl">
      <h2 className="text-[#7CFC00] text-xl font-bold mb-4">
        Traffic by Country
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="country"
            outerRadius={110}
            fill="#7CFC00"
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