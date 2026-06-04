import {
  FiHome,
  FiLink,
  FiBarChart2,
  FiGrid,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "URLs", icon: <FiLink />, path: "/urls" },
    { name: "Analytics", icon: <FiBarChart2 />, path: "/analytics" },
    { name: "QR", icon: <FiGrid />, path: "/qr-center" },
    { name: "Profile", icon: <FiUser />, path: "/profile" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <aside
      className="
        fixed
        top-0
        left-0
        h-screen
        w-44
        bg-white
        border-r
        shadow-sm
        z-40
      "
    >

      {/* Logo */}
      <div className="p-4 border-b text-center">
        <h1 className="text-lg font-bold text-indigo-600">
          URLPro
        </h1>
        <p className="text-[10px] text-gray-500">
          Smart URL
        </p>
      </div>

      {/* Menu */}
      <nav className="p-2 space-y-1">

        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all

              ${
                location.pathname === item.path
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >

            <span className="text-sm">
              {item.icon}
            </span>

            <span className="truncate">
              {item.name}
            </span>

          </Link>
        ))}

      </nav>

    </aside>
  );
}