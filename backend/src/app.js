const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// =====================
// ROUTES
// =====================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const publicRoutes = require("./routes/publicRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const activityRoutes = require("./routes/activityRoutes");
const topLinksRoutes = require("./routes/topLinksRoutes");

// 🔥 IMPORTANT: API ROUTES MOUNTING
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/top-links", topLinksRoutes);

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API Running",
    version: "1.0.0",
  });
});

// =====================
// SHORT URL REDIRECT
// =====================
const { redirectUrl } = require("./controllers/urlController");

app.get("/:shortCode", redirectUrl);

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;