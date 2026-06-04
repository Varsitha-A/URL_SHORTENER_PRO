export default function VisitorTable({ data }) {
  return (
    <div className="bg-[#0f1511] border border-[#2f5e3b] p-6 rounded-2xl">
      <h2 className="text-[#7CFC00] text-xl font-bold mb-4">
        Recent Visitors
      </h2>

      <table className="w-full text-left text-[#cde8c7]">
        <thead>
          <tr className="text-[#7CFC00] border-b border-[#2f5e3b]">
            <th className="p-2">IP</th>
            <th className="p-2">Country</th>
            <th className="p-2">Device</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => (
            <tr key={i} className="border-b border-[#2f5e3b]/30">
              <td className="p-2">{v.ip}</td>
              <td className="p-2">{v.country}</td>
              <td className="p-2">{v.device}</td>
              <td className="p-2">{v.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}