import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-[#0f1410] via-[#161d18] to-[#0f1410]">

      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7fb800]/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8b5a2b]/20 rounded-full blur-3xl"
      />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#161d18] via-[#1c241d] to-[#0f1410] text-[#e7d7c1] relative overflow-hidden">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">

          <span className="inline-flex w-fit px-5 py-2 rounded-full bg-[#7fb800]/20 text-[#84cc16] text-sm font-medium">
            Smart Analytics Platform
          </span>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-8xl font-black mt-8 leading-tight text-[#e7d7c1]"
          >
            Shorten.
            <br />
            Track.
            <br />
            Grow.
          </motion.h1>

          <p className="mt-8 text-2xl text-[#c9b08a] max-w-xl">
            Powerful URL shortening with real-time analytics, QR codes,
            custom aliases and advanced tracking.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-12">

            {[
              ["10M+", "Links Created"],
              ["99.9%", "Uptime"],
              ["250K+", "Users"],
              ["500M+", "Clicks Tracked"],
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -6 }}
                className="bg-[#1c241d]/60 border border-[#6b7550]/40 rounded-3xl p-6"
              >
                <h3 className="text-4xl font-bold text-[#84cc16]">
                  {item[0]}
                </h3>
                <p className="mt-2 text-[#c9b08a]">
                  {item[1]}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            w-full
            max-w-2xl
            bg-[#161d18]
            border
            border-[#6b7550]
            shadow-2xl
            rounded-[40px]
            p-14
          "
        >

          {/* Header */}
          <div>

            <span className="
              inline-flex
              px-4
              py-2
              rounded-full
              bg-[#7fb800]/20
              text-[#84cc16]
              font-semibold
              text-sm
            ">
              Welcome Back 
            </span>

            <h2 className="
              text-6xl
              font-black
              text-[#e7d7c1]
              mt-5
              leading-tight
            ">
              Sign In
            </h2>

            <p className="
              text-lg
              text-[#c9b08a]
              mt-4
            ">
              Access your dashboard, analytics and smart URLs.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-10"
          >

            <div className="relative">

              <FiMail
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#84cc16]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  pl-14
                  pr-5
                  py-5
                  text-lg
                  bg-[#0f1410]
                  border-2
                  border-[#6b7550]
                  rounded-2xl
                  focus:border-[#84cc16]
                  focus:ring-4
                  focus:ring-[#84cc16]/20
                  outline-none
                  transition-all
                  text-[#e7d7c1]
                "
              />

            </div>

            <div className="relative">

              <FiLock
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#84cc16]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  pl-14
                  pr-5
                  py-5
                  text-lg
                  bg-[#0f1410]
                  border-2
                  border-[#6b7550]
                  rounded-2xl
                  focus:border-[#84cc16]
                  focus:ring-4
                  focus:ring-[#84cc16]/20
                  outline-none
                  transition-all
                  text-[#e7d7c1]
                "
              />

            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="
                w-full
                py-5
                rounded-2xl
                text-lg
                font-bold
                text-[#0f1410]
                bg-gradient-to-r
                from-[#7fb800]
                to-[#84cc16]
                shadow-xl
                transition-all
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>

          </form>

          {/* Footer */}
          <p className="text-center mt-10 text-[#c9b08a]">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-[#84cc16] hover:text-[#7fb800]"
            >
              Register
            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  );
}