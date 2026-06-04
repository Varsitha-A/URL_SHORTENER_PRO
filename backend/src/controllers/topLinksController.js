const Url = require("../models/Url");

const getTopLinks = async (req, res) => {
  try {

    const topLinks = await Url.find({
      userId: req.user._id
    })
    .sort({ clickCount: -1 })
    .limit(10);

    res.status(200).json({
      success: true,
      data: topLinks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTopLinks
};