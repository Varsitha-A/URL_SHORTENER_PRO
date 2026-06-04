import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1410] px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-[#7fb800] opacity-10 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="
        relative
        w-full max-w-2xl
        text-center
        p-12
        rounded-3xl
        bg-[#161d18]
        border border-[#6b7550]
        shadow-2xl
        hover:scale-[1.01]
        transition-all
        duration-300
      ">

        {/* ICON */}
        <div className="
          w-24 h-24
          mx-auto
          flex items-center justify-center
          rounded-full
          bg-[#1c241d]
          border border-[#6b7550]
          shadow-md
        ">
          <FiAlertTriangle size={50} className="text-[#7fb800]" />
        </div>

        {/* 404 TEXT */}
        <h1 className="text-7xl font-extrabold text-[#e7d7c1] mt-8 tracking-wide">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-[#7fb800] mt-3">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[#c9b08a] mt-4 text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* BUTTON */}
        <Link
          to="/dashboard"
          className="
            inline-block
            mt-10
            px-8 py-4
            rounded-2xl
            font-semibold
            bg-gradient-to-r from-[#7fb800] to-[#84cc16]
            text-[#0f1410]
            shadow-lg
            hover:scale-105
            hover:shadow-green-500/20
            transition-all
            duration-300
          "
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}