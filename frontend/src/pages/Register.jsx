import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await registerUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#0f1410] text-[#e7d7c1]">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-[#161d18] border-r border-[#6b7550]">

        <div className="relative z-10 flex flex-col justify-center px-16">

          <span className="inline-flex w-fit px-5 py-2 rounded-full bg-[#1c241d] text-[#7fb800] text-sm font-medium border border-[#6b7550]">
            Join URLPro
          </span>

          <motion.h1
            className="text-7xl font-black mt-8 leading-tight text-[#7fb800]"
          >
            Create.
            <br />
            Share.
            <br />
            Grow.
          </motion.h1>

          <p className="mt-6 text-lg text-[#c9b08a] max-w-xl">
            Smart URL management with analytics and QR codes.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-8">

        <motion.div
          className="
            w-full
            max-w-2xl
            bg-[#161d18]
            border
            border-[#6b7550]
            shadow-2xl
            rounded-[35px]
            p-12
          "
        >

          {/* HEADER */}
          <div>

            <span className="
              inline-flex
              px-4
              py-2
              rounded-full
              bg-[#1c241d]
              text-[#7fb800]
              text-sm
              border border-[#6b7550]
            ">
              Create Account
            </span>

            <h2 className="
              text-5xl
              font-black
              mt-5
              text-[#7fb800]
            ">
              Register
            </h2>

            <p className="text-[#c9b08a] mt-3">
              Start managing smart URLs
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">

            <div className="relative">
              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7fb800]" />
              <input
                className="
                  w-full
                  pl-14
                  py-4
                  rounded-xl
                  bg-[#0f1410]
                  border border-[#6b7550]
                  text-[#e7d7c1]
                  focus:border-[#7fb800]
                  outline-none
                "
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7fb800]" />
              <input
                className="
                  w-full
                  pl-14
                  py-4
                  rounded-xl
                  bg-[#0f1410]
                  border border-[#6b7550]
                  text-[#e7d7c1]
                  focus:border-[#7fb800]
                  outline-none
                "
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7fb800]" />
              <input
                className="
                  w-full
                  pl-14
                  py-4
                  rounded-xl
                  bg-[#0f1410]
                  border border-[#6b7550]
                  text-[#e7d7c1]
                  focus:border-[#7fb800]
                  outline-none
                "
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="
                w-full
                py-4
                rounded-xl
                font-bold
                text-[#0f1410]
                bg-[#7fb800]
                hover:bg-[#84cc16]
                transition-all
              "
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-[#c9b08a]">
            Already have an account?
            <Link to="/" className="text-[#7fb800] ml-2">
              Login
            </Link>
          </p>

        </motion.div>

      </div>
    </div>
  );
}