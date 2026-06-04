import { useState } from "react";
import {
  FiBell,
  FiSearch,
  FiHome,
  FiLink,
  FiBarChart2,
  FiGrid,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "URLs", icon: <FiLink />, path: "/urls" },
    { name: "Analytics", icon: <FiBarChart2 />, path: "/analytics" },
    { name: "QR Center", icon: <FiGrid />, path: "/qr-center" },
  ];

  // ======================
  // LOGOUT FUNCTION
  // ======================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f1410] border-b border-[#6b7550]">

      <div className="h-20 px-10 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#7fb800] to-[#84cc16] animate-pulse" />
          <h1 className="text-[#e7d7c1] font-extrabold text-xl tracking-wide">
            URLPro
          </h1>
        </div>

        {/* NAV MENU */}
        <nav className="hidden md:flex items-center gap-6 bg-[#161d18] border border-[#6b7550] px-6 py-3 rounded-full shadow-lg">

          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-300 hover:scale-105 hover:bg-[#1c241d]
                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-[#7fb800] to-[#84cc16] text-[#0f1410] shadow-md"
                    : "text-[#e7d7c1]"
                }
              `}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5 relative">

          {/* SEARCH */}
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="p-3 rounded-full bg-[#161d18] border border-[#6b7550]
            hover:scale-110 hover:bg-[#1c241d] transition-all duration-300"
          >
            <FiSearch className="text-[#e7d7c1]" />
          </button>

          {/* NOTIFICATION */}
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="p-3 rounded-full bg-[#161d18] border border-[#6b7550]
            hover:scale-110 hover:bg-[#1c241d] transition-all duration-300"
          >
            <FiBell className="text-[#e7d7c1]" />
          </button>

          {/* PROFILE */}
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#7fb800] to-[#84cc16]
            flex items-center justify-center text-[#0f1410] font-bold
            cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg"
          >
            U
          </div>

          {/* SEARCH DROPDOWN */}
          {openSearch && (
            <div className="absolute right-0 top-16 w-80 bg-[#161d18] border border-[#6b7550] rounded-2xl p-4 shadow-xl">
              <input
                type="text"
                placeholder="Search URLs..."
                className="w-full p-3 bg-[#0f1410] border border-[#6b7550]
                rounded-xl text-[#e7d7c1] outline-none"
              />
            </div>
          )}

          {/* NOTIFICATION DROPDOWN */}
          {openNotif && (
            <div className="absolute right-14 top-16 w-72 bg-[#161d18] border border-[#6b7550]
            rounded-2xl p-4 shadow-xl">

              <p className="text-[#e7d7c1] font-semibold mb-2">
                Notifications
              </p>

              <p className="text-[#c9b08a] text-sm">
                No new notifications 🌿
              </p>

            </div>
          )}

          {/* PROFILE DROPDOWN */}
          {openProfile && (
            <div className="absolute right-0 top-16 w-52 bg-[#161d18] border border-[#6b7550]
            rounded-2xl p-3 shadow-xl space-y-2">

              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1c241d]
                transition-all text-[#e7d7c1]"
              >
                <FiUser /> Profile
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1c241d]
                transition-all text-[#e7d7c1]"
              >
                <FiSettings /> Settings
              </Link>

              {/* LOGOUT (UPDATED UI) */}
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-3 px-4 py-3
                  rounded-xl border border-[#6b7550]
                  bg-[#161d18]
                  text-red-400
                  hover:bg-[#1c241d]
                  hover:scale-[1.02]
                  transition-all duration-300
                  shadow-md
                "
              >
                <FiLogOut className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}