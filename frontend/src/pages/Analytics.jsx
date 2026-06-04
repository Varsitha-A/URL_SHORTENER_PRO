import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getMyUrls } from "../services/urlService";

export default function Analytics() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMyUrls();
      setUrls(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };

  const safeUrls = Array.isArray(urls) ? urls : [];

  const totalClicks = safeUrls.reduce(
    (sum, u) => sum + (u.clickCount || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-[#0f1410] text-[#e7d7c1] p-8 space-y-10">

        {/* HEADER */}
        <div className="card">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="text-[#c9b08a] mt-2">
            Visual insights of your URL performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="card">
            <h2>Total URLs</h2>
            <p className="text-2xl text-[#84cc16]">{safeUrls.length}</p>
          </div>

          <div className="card">
            <h2>Total Clicks</h2>
            <p className="text-2xl text-[#84cc16]">{totalClicks}</p>
          </div>

          <div className="card">
            <h2>Average Clicks</h2>
            <p className="text-2xl text-[#84cc16]">
              {safeUrls.length
                ? (totalClicks / safeUrls.length).toFixed(1)
                : 0}
            </p>
          </div>

        </div>

        {/* 🔥 PIE CHARTS SECTION */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* CLICK DISTRIBUTION PIE */}
          <div className="card">
            <h2 className="text-[#84cc16] font-bold mb-4">
              Click Distribution
            </h2>

            <div className="space-y-3">

              {safeUrls.slice(0, 5).map((u, i) => (
                <div key={i} className="flex items-center gap-3">

                  {/* PIE SEGMENT VISUAL */}
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#84cc16 " +
                        (u.clickCount || 0) * 10 +
                        "%, #161d18 0%)",
                    }}
                  />

                  <span className="flex-1 text-[#c9b08a]">
                    {u.shortCode}
                  </span>

                  <span className="text-[#84cc16]">
                    {u.clickCount || 0}
                  </span>

                </div>
              ))}

            </div>
          </div>

          {/* DEVICE PIE CHART */}
          <div className="card">
            <h2 className="text-[#84cc16] font-bold mb-4">
              Device Usage
            </h2>

            <div className="flex justify-center">

              <div
                className="w-40 h-40 rounded-full"
                style={{
                  background:
                    "conic-gradient(#84cc16 65%, #6b7550 65% 90%, #c9b08a 90%)",
                }}
              />

            </div>

            <div className="mt-4 text-sm space-y-1">

              <p>🟢 Mobile - 65%</p>
              <p>🟡 Desktop - 25%</p>
              <p>⚪ Tablet - 10%</p>

            </div>

          </div>

          {/* COUNTRY PIE CHART */}
          <div className="card">
            <h2 className="text-[#84cc16] font-bold mb-4">
              Country Traffic
            </h2>

            <div className="flex justify-center">

              <div
                className="w-40 h-40 rounded-full"
                style={{
                  background:
                    "conic-gradient(#84cc16 50%, #6b7550 50% 75%, #c9b08a 75% 90%, #161d18 90%)",
                }}
              />

            </div>

            <div className="mt-4 text-sm space-y-1">

              <p>🟢 India - 50%</p>
              <p>🟡 USA - 25%</p>
              <p>🟠 UK - 15%</p>
              <p>⚪ Others - 10%</p>

            </div>

          </div>

        </div>

        {/* BEST URL */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">
            Best Performing URL
          </h2>

          {safeUrls.length > 0 ? (
            <p className="text-[#84cc16]">
              http://localhost:5000/
              {safeUrls.sort(
                (a, b) => (b.clickCount || 0) - (a.clickCount || 0)
              )[0]?.shortCode}
            </p>
          ) : (
            <p>No data available</p>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}