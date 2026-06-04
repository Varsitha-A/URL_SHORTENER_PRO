const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },

    ipAddress: {
      type: String,
      default: "unknown",
    },

    userAgent: {
      type: String,
      default: "unknown",
    },

    // ✅ NEW: device tracking
    device: {
      type: String,
      enum: ["mobile", "desktop", "tablet", "unknown"],
      default: "unknown",
    },

    // ✅ NEW: country tracking (future API support)
    country: {
      type: String,
      default: "unknown",
    },

    // click time
    clickedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analytics", analyticsSchema);