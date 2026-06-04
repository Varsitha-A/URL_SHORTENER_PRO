const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    customAlias: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    qrCode: {
      type: String,
      default: "",
    },

    // =========================
    // CLICK TRACKING
    // =========================
    clickCount: {
      type: Number,
      default: 0,
    },

    // =========================
    // ANALYTICS SUPPORT (NEW)
    // =========================
    analytics: [
      {
        device: {
          type: String,
          enum: ["mobile", "desktop", "tablet", "unknown"],
          default: "unknown",
        },

        country: {
          type: String,
          default: "unknown",
        },

        ipAddress: {
          type: String,
          default: "",
        },

        userAgent: {
          type: String,
          default: "",
        },

        clickedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);