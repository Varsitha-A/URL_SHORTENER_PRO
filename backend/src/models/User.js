const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ⭐ NEW: profile picture support
    avatar: {
      type: String,
      default: "",
    },

    // ⭐ NEW: user plan system (Free / Pro / Premium)
    plan: {
      type: String,
      enum: ["Free", "Pro", "Premium"],
      default: "Free",
    },

    // ⭐ NEW: optional bio for profile page
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);