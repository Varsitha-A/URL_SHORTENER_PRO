const Analytics = require("../models/Analytics");
const Url = require("../models/Url");

const getRecentActivity = async (req, res) => {
  try {

    const urls = await Url.find({
      userId: req.user._id
    });

    const urlIds = urls.map(url => url._id);

    const activities = await Analytics.find({
      urlId: { $in: urlIds }
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getRecentActivity
};