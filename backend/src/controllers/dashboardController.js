const Url = require("../models/Url");

const getDashboardStats = async (req, res) => {
  try {
    const urls = await Url.find({
      userId: req.user._id,
    });

    const totalLinks = urls.length;

    const totalClicks = urls.reduce(
      (sum, url) => sum + url.clickCount,
      0
    );

    const activeLinks = urls.filter(
      (url) =>
        !url.expiryDate ||
        new Date(url.expiryDate) > new Date()
    ).length;

    const expiredLinks = urls.filter(
      (url) =>
        url.expiryDate &&
        new Date(url.expiryDate) <= new Date()
    ).length;

    let mostClickedUrl = null;

    if (urls.length > 0) {
      mostClickedUrl = urls.reduce((max, current) =>
        current.clickCount > max.clickCount
          ? current
          : max
      );
    }

    res.status(200).json({
      success: true,
      data: {
        totalLinks,
        totalClicks,
        activeLinks,
        expiredLinks,
        mostClickedUrl,
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
  getDashboardStats,
};