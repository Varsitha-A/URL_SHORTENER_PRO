import {
  FiX,
  FiHome,
  FiLink,
  FiBarChart2,
  FiGrid,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function MobileNav({
  open,
  setOpen,
}) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      name: "URLs",
      icon: <FiLink />,
      path: "/urls",
    },
    {
      name: "Analytics",
      icon: <FiBarChart2 />,
      path: "/analytics",
    },
    {
      name: "QR Center",
      icon: <FiGrid />,
      path: "/qr-center",
    },
    {
      name: "Profile",
      icon: <FiUser />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`
        fixed
        inset-0
        bg-black/30
        backdrop-blur-sm
        z-40
        transition-all
        duration-300

        ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
        fixed
        top-0
        left-0
        h-screen
        w-80
        bg-white
        shadow-2xl
        z-50
        transition-transform
        duration-300

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        `}
      >

        {/* Header */}

        <div
          className="
          p-6
          border-b
          border-slate-200
          flex
          items-center
          justify-between
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-black
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              bg-clip-text
              text-transparent
              "
            >
              URLPro
            </h1>

            <p
              className="
              text-slate-500
              text-sm
              "
            >
              Smart URL Platform
            </p>

          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
            w-10
            h-10
            rounded-xl
            bg-slate-100
            flex
            items-center
            justify-center
            hover:bg-slate-200
            "
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="p-4">

          {menuItems.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              onClick={() =>
                setOpen(false)
              }
              className={`
              flex
              items-center
              gap-4
              px-5
              py-4
              rounded-2xl
              mb-3
              transition-all
              duration-300

              ${
                location.pathname === item.path
                  ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  text-white
                  shadow-lg
                  `
                  : `
                  text-slate-700
                  hover:bg-slate-100
                  `
              }
              `}
            >

              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-semibold">
                {item.name}
              </span>

            </Link>

          ))}

        </nav>

        {/* Footer */}

        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          p-6
          border-t
          border-slate-200
          "
        >

          <div
            className="
            bg-gradient-to-r
            from-cyan-50
            to-purple-50
            rounded-2xl
            p-4
            "
          >

            <h3
              className="
              font-bold
              text-slate-800
              "
            >
              URLPro Premium
            </h3>

            <p
              className="
              text-sm
              text-slate-500
              mt-1
              "
            >
              Manage links smarter 🚀
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}