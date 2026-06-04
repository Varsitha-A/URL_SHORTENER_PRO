import { useEffect, useState } from "react";
import {
  FiCopy,
  FiTrash2,
  FiSearch,
  FiLink,
  FiPlus,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  createUrl,
  getMyUrls,
  deleteUrl,
} from "../services/urlService";

export default function Urls() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await getMyUrls();
      setUrls(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    if (!longUrl.trim()) return alert("Enter URL");

    try {
      setLoading(true);
      await createUrl({ originalUrl: longUrl });
      setLongUrl("");
      fetchUrls();
    } catch (error) {
      alert("Failed to create URL");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this URL?")) return;

    try {
      await deleteUrl(id);
      fetchUrls();
    } catch (error) {
      console.log(error);
    }
  };

  const copyUrl = (shortCode) => {
    navigator.clipboard.writeText(
      `http://localhost:5000/${shortCode}`
    );
  };

  const filteredUrls = urls.filter((url) =>
    url.shortCode?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-[#0f1410] text-[#e7d7c1] p-8 space-y-8">

        {/* HEADER */}
        <div className="card">
          <h1 className="text-4xl font-bold">
            URL Management
          </h1>
          <p className="text-[#c9b08a] mt-2">
            Create, manage and track your shortened URLs
          </p>
        </div>

        {/* CREATE BOX */}
        <div className="card space-y-4">

          <h2 className="text-2xl font-bold text-[#e7d7c1]">
            Create New URL
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="https://example.com"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />

            <button
              onClick={handleCreate}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus />
              {loading ? "Creating..." : "Create"}
            </button>

          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="card flex items-center gap-3">

          <FiSearch className="text-[#84cc16]" />

          <input
            type="text"
            placeholder="Search URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-[#e7d7c1]"
          />

        </div>

        {/* LIST */}
        <div className="space-y-5">

          {filteredUrls.length === 0 ? (
            <div className="card text-center">
              <FiLink size={40} className="mx-auto text-[#84cc16]" />
              <h2 className="text-xl font-bold mt-4">
                No URLs Found
              </h2>
              <p className="text-[#c9b08a] mt-2">
                Create your first shortened URL above
              </p>
            </div>
          ) : (
            filteredUrls.map((url) => (
              <div
                key={url._id}
                className="card flex flex-col lg:flex-row justify-between gap-6"
              >

                {/* URL INFO */}
                <div className="space-y-2">

                  <h3 className="text-[#84cc16] font-bold text-lg break-all">
                    http://localhost:5000/{url.shortCode}
                  </h3>

                  <p className="text-[#c9b08a] break-all">
                    {url.originalUrl}
                  </p>

                  <div className="flex gap-6 text-sm text-[#c9b08a]">
                    <span>Clicks: {url.clickCount || 0}</span>
                    <span>
                      Created:{" "}
                      {new Date(url.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() => copyUrl(url.shortCode)}
                    className="btn-outline flex items-center gap-2"
                  >
                    <FiCopy /> Copy
                  </button>

                  <button
                    onClick={() => handleDelete(url._id)}
                    className="px-4 py-2 rounded-xl border border-red-500/40 text-red-300"
                  >
                    <FiTrash2 /> Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}