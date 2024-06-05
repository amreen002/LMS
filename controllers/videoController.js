
const { Video, Courses, Topic, Categories } = require('../models')
exports.create = async (req, res) => {
    try {
        let data = {
            Title: req.body.Title,
            CoursesId: req.body.CoursesId,
            TopicId: req.body.TopicId,
            VideoUplod: req.file.path,
            VideoIframe: req.body.VideoIframe,
        }

        const video = await Video.create(data)

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
        const video = await Video.findOne({ where: { id: req.params.videoId }, include: [{model:Courses,include: [{ model: Topic }] }] });
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
        let where = {}
        let video = await Video.findAll({ where ,include: [{model:Courses,include: [{ model: Topic },{model:Categories}] }]});

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
        let data = {
            Title: req.body.Title,
            CoursesId: req.body.CoursesId,
            TopicId: req.body.TopicId,
            VideoUplod: req.file.path,
            VideoIframe: req.body.VideoIframe,
        }
        const video = await Video.update(data, { where: { id: req.params.videoId } });
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


