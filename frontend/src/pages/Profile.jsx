import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getProfile, updateProfile } from "../services/userService";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const data = res.data?.user || res.data;

        setUser({
          name: data?.name || "",
          email: data?.email || "",
          bio: data?.bio || "",
          avatar: data?.avatar || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setUser({ ...user, avatar: url });
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateProfile(user);
      const data = res.data?.user || res.data;

      setUser({
        name: data?.name || "",
        email: data?.email || "",
        bio: data?.bio || "",
        avatar: data?.avatar || "",
      });

      alert("Profile updated!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>

      {/* FULL WIDTH PAGE */}
      <div className="min-h-screen w-full bg-[#0f1410] text-[#e7d7c1] p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#e7d7c1]">
            Profile Settings
          </h1>
          <p className="text-[#c9b08a] mt-2">
            Manage your account, avatar and bio
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">

          {/* LEFT PROFILE CARD */}
          <div className="card flex flex-col items-center text-center space-y-4">

            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-[#84cc16] bg-[#161d18] flex items-center justify-center">

              {user.avatar ? (
                <img
                  src={preview || user.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-[#84cc16]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}

            </div>

            <input
              type="file"
              onChange={handleImage}
              className="text-sm text-[#c9b08a]"
            />

            <div>
              <h2 className="text-xl font-bold text-[#e7d7c1]">
                {user.name || "Your Name"}
              </h2>
              <p className="text-[#c9b08a] text-sm">
                {user.email || "your@email.com"}
              </p>
            </div>

          </div>

          {/* RIGHT FORM (TAKES 2 COLUMNS) */}
          <div className="lg:col-span-2 card space-y-5">

            <h2 className="text-2xl font-bold text-[#e7d7c1]">
              Edit Profile
            </h2>

            <input
              placeholder="Full Name"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <textarea
              placeholder="Write your bio..."
              value={user.bio}
              onChange={(e) =>
                setUser({ ...user, bio: e.target.value })
              }
              className="h-32"
            />

            <button
              onClick={handleUpdate}
              className="btn-primary w-full"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>

          </div>

        </div>

        {/* BIO PREVIEW SECTION */}
        <div className="card mt-8 flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#84cc16] flex items-center justify-center text-[#0f1410] font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p className="text-[#e7d7c1] font-semibold">
              {user.name || "No Name"}
            </p>
            <p className="text-[#c9b08a] text-sm">
              {user.bio || "Your bio will appear here"}
            </p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}