const Url = require("../models/Url");
const Analytics = require("../models/Analytics");
const generateShortCode = require("../utils/generateShortCode");
const generateQRCode = require("../services/qrService");

// ==============================
// CREATE URL
// ==============================
const createUrl = async (req, res) => {
  try {
    const {
      originalUrl,
      customAlias,
      title,
      description,
      expiryDate,
    } = req.body;

    let shortCode;

    if (customAlias) {
      const aliasExists = await Url.findOne({
        shortCode: customAlias,
      });

      if (aliasExists) {
        return res.status(400).json({
          success: false,
          message: "Alias already exists",
        });
      }

      shortCode = customAlias;
    } else {
      shortCode = generateShortCode();
    }

    const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

    const qrCode = await generateQRCode(
      `${baseUrl}/api/urls/r/${shortCode}`
    );

    const url = await Url.create({
      userId: req.user._id,
      originalUrl,
      shortCode,
      customAlias,
      title,
      description,
      qrCode,
      expiryDate,
      clickCount: 0,
    });

    return res.status(201).json({
      success: true,
      data: url,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET ALL URLS
// ==============================
const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET SINGLE URL
// ==============================
const getUrlById = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: url,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// UPDATE URL
// ==============================
const updateUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    url.originalUrl = req.body.originalUrl || url.originalUrl;
    url.title = req.body.title || url.title;
    url.description = req.body.description || url.description;
    url.expiryDate = req.body.expiryDate || url.expiryDate;

    await url.save();

    return res.status(200).json({
      success: true,
      data: url,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// DELETE URL
// ==============================
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    await url.deleteOne();

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// REDIRECT + ANALYTICS (FIXED)
// ==============================
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // expiry check
    if (url.expiryDate && new Date(url.expiryDate) < new Date()) {
      return res.status(410).json({
        success: false,
        message: "Link has expired",
      });
    }

    // ==============================
    // DEVICE DETECTION
    // ==============================
    const userAgent = req.headers["user-agent"] || "";

    let device = "desktop";
    if (/mobile/i.test(userAgent)) device = "mobile";
    else if (/tablet/i.test(userAgent)) device = "tablet";

    // ==============================
    // COUNTRY DETECTION (IP API)
    // ==============================
    let country = "Unknown";

    try {
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.ip ||
        "";

      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();

      country = data.country_name || "Unknown";
    } catch (err) {
      console.log("Country detection failed:", err.message);
    }

    // ==============================
    // UPDATE CLICK COUNT
    // ==============================
    url.clickCount = (url.clickCount || 0) + 1;
    await url.save();

    // ==============================
    // SAVE ANALYTICS (NON-BLOCKING)
    // ==============================
    Analytics.create({
      urlId: url._id,
      ipAddress: req.ip || "unknown",
      userAgent,
      device,
      country,
      clickedAt: new Date(),
    }).catch((err) =>
      console.log("Analytics error:", err.message)
    );

    // redirect
    return res.redirect(url.originalUrl);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// EXPORTS
// ==============================
module.exports = {
  createUrl,
  getMyUrls,
  getUrlById,
  updateUrl,
  deleteUrl,
  redirectUrl,
};