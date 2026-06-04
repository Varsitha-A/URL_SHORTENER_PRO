const Url = require("../models/Url");
const Analytics = require("../models/Analytics");

const getPublicStats = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    const recentVisits = await Analytics.find({
      urlId: url._id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        title: url.title,
        description: url.description,
        clickCount: url.clickCount,
        createdAt: url.createdAt,
        expiryDate: url.expiryDate,
        recentVisits,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPublicStats,
};