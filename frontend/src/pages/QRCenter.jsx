import { useEffect, useState } from "react";
import {
  FiDownload,
  FiCopy,
  FiGrid,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";
import { getMyUrls } from "../services/urlService";

export default function QRCenter() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await getMyUrls();
      setUrls(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = (shortCode) => {
    navigator.clipboard.writeText(
      `http://localhost:5000/${shortCode}`
    );
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-[#0f1410] text-[#e7d7c1] p-8 space-y-8">

        {/* HEADER */}
        <div className="card">

          <h1 className="text-4xl font-bold text-[#e7d7c1]">
            QR Center
          </h1>

          <p className="text-[#c9b08a] mt-2">
            Generate, view and download QR codes for your URLs
          </p>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="card text-center">
            Loading QR Codes...
          </div>
        ) : urls.length === 0 ? (
          <div className="card text-center">

            <FiGrid size={50} className="mx-auto text-[#84cc16]" />

            <h2 className="text-2xl font-bold mt-4">
              No URLs Available
            </h2>

            <p className="text-[#c9b08a] mt-2">
              Create a URL first to generate QR codes
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {urls.map((url) => (
              <div
                key={url._id}
                className="card flex flex-col items-center text-center"
              >

                {/* QR IMAGE */}
                <div className="p-4 bg-[#161d18] rounded-2xl border border-[#6b7550]">
                  <img
                    src={url.qrCode}
                    alt="QR Code"
                    className="w-52 h-52 object-contain"
                  />
                </div>

                {/* SHORT LINK */}
                <p className="mt-4 text-[#84cc16] font-bold break-all">
                  http://localhost:5000/{url.shortCode}
                </p>

                {/* ACTIONS */}
                <div className="mt-6 flex gap-3 w-full">

                  <button
                    onClick={() => copyUrl(url.shortCode)}
                    className="btn-outline flex-1 flex items-center justify-center gap-2"
                  >
                    <FiCopy /> Copy
                  </button>

                  <a
                    href={url.qrCode}
                    download
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <FiDownload /> Download
                  </a>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}