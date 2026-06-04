const Url = require("../models/Url");

const getInsights = async (req, res) => {
  try {

    const urls = await Url.find({
      userId:req.user._id
    });

    const recentUrls =
      urls
      .sort(
        (a,b)=>
          b.createdAt-a.createdAt
      )
      .slice(0,5);

    const mostClicked =
      urls.sort(
        (a,b)=>
          b.clickCount-a.clickCount
      )[0];

    res.json({
      success:true,
      recentUrls,
      mostClicked
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

module.exports = {
  getInsights
};