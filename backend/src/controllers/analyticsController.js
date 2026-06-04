const Analytics =
require("../models/Analytics");

const Url =
require("../models/Url");

const getAnalytics = async (req,res)=>{

    try{

        const { id } = req.params;

        const url =
        await Url.findById(id);

        if(!url){
            return res.status(404).json({
                message:"URL not found"
            });
        }

        const visits =
        await Analytics.find({
            urlId:id
        }).sort({createdAt:-1});

        res.json({
            totalClicks:url.clickCount,
            visits
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });
    }
};

module.exports = {
    getAnalytics
};