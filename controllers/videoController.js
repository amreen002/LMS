
const { Video, SaleTeam,Role ,User} = require('../models')
exports.create = async (req, res) => {
    try {
      
        const video = await Video.create(req.body)

        return res.status(200).json({
            video: video,
            success: true,
            message: "Video Created SuccessFully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            success: false,
            message: "Video  error"
        })
    }

}

exports.findOne = async (req, res) => {
    try {
        const video = await Video.findOne({ where: { id: req.params.videoId },include: [{ model: User }] });
        res.status(200).json({
            video: video,
            success: true,
            message: "get one Video by ID"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: 'error in getting the Video'
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        let where={}
        let video = await Video.findAll({where,include: [{ model: User,include: [{ model: Role }] }]});
        res.status(200).json({
            video: video,
            success: true,
            message: "Get All Video Data Success"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: "Get Not All  Video Data Success"
        });
    }
}

exports.update = async (req, res) => {
    try {
        const video = await Video.update(req.body, { where: { id: req.params.videoId } });
        res.status(200).json({
            video: video,
            success: true,
            message: "Update Successfully Video"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: "error  While Update The Video"
        });
    }

}

exports.delete = async (req, res) => {
    try {
        const video = await Video.destroy({ where: { id: req.params.videoId } });
        res.status(200).json({
            video: video,
            success: true,
            message: "Delete Successfully Video"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: 'Video not found'
        });
    }
}


