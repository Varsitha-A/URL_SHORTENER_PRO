import { Link } from "react-router-dom";
import {
  FiLink,
  FiBarChart2,
  FiGrid,
  FiArrowRight,
} from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";

export default function Dashboard() {

  const cards = [
    {
      title: "Manage URLs",
      description: "Create, edit and organize your shortened links",
      icon: <FiLink size={28} />,
      link: "/urls",
      accent: "from-[#7fb800] to-[#84cc16]",
    },
    {
      title: "Analytics",
      description: "Track clicks and performance insights",
      icon: <FiBarChart2 size={28} />,
      link: "/analytics",
      accent: "from-[#6b7550] to-[#7fb800]",
    },
    {
      title: "QR Center",
      description: "Generate QR codes instantly",
      icon: <FiGrid size={28} />,
      link: "/qr-center",
      accent: "from-[#8b5a2b] to-[#c9b08a]",
    },
  ];

  return (
    <DashboardLayout>

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-[#0f1410] text-[#e7d7c1] p-8 space-y-10">

        {/* HERO SECTION */}
        <div className="rounded-3xl p-10 bg-[#161d18] border border-[#6b7550] shadow-xl">

          <h1 className="text-4xl md:text-5xl font-bold text-[#e7d7c1]">
            Welcome Back 
          </h1>

          <p className="mt-4 text-[#c9b08a] text-lg max-w-2xl">
            Manage your URLs, analytics, and QR codes in a clean nature-inspired dashboard.
          </p>

          <div className="mt-6">
            <button className="btn-primary">
              Create New URL
            </button>
          </div>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {cards.map((card) => (
            <Link key={card.title} to={card.link}>

              <div className="
                group
                bg-[#161d18]
                border border-[#6b7550]
                rounded-3xl
                p-8
                shadow-lg
                hover:scale-[1.03]
                transition-all
                duration-300
              ">

                {/* ICON */}
                <div className={`
                  w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  text-[#0f1410]
                  bg-gradient-to-r ${card.accent}
                  shadow-md
                `}>
                  {card.icon}
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-bold mt-5 text-[#e7d7c1]">
                  {card.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-[#c9b08a] mt-2 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* ACTION */}
                <div className="
                  mt-6 flex items-center gap-2
                  text-[#84cc16]
                  font-semibold
                  group-hover:gap-4
                  transition-all
                ">
                  Open <FiArrowRight />
                </div>

              </div>

            </Link>
          ))}

        </div>

        {/* STATS SECTION */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="card">
            <p className="text-[#c9b08a]">Total URLs</p>
            <h3 className="text-3xl font-bold text-[#e7d7c1] mt-2">--</h3>
          </div>

          <div className="card">
            <p className="text-[#c9b08a]">Total Clicks</p>
            <h3 className="text-3xl font-bold text-[#e7d7c1] mt-2">--</h3>
          </div>

          <div className="card">
            <p className="text-[#c9b08a]">QR Codes</p>
            <h3 className="text-3xl font-bold text-[#e7d7c1] mt-2">--</h3>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}