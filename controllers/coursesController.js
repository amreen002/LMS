
const { Op } = require('sequelize');
const { Courses, User } = require('../models')
exports.create = async (req, res) => {
    try {
        req.body.userId = req.profile.id;
        const courses = await Courses.create(req.body)
        return res.status(200).json({
            courses: courses,
            success: true,
            message: "Courses Created SuccessFully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            success: false,
            message: "Courses error"
        })
    }

}

exports.findOne = async (req, res) => {
    try {
        const courses = await Courses.findOne({ where: { id: req.params.coursesId }, order: [['updatedAt', 'DESC']] });
        res.status(200).json({
            courses: courses,
            success: true,
            message: "get one Courses by ID"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: 'error in getting the Front Desk'
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        /*      const searchTerm = req.query.searchTerm;
             if (searchTerm) {
                 where = {
                     [Op.or]: [
                         { telecallerPersonName: { [Op.like]: `%${searchTerm}%` } }, // Using 'like' operator for partial matching
                         // Add more fields for searching if needed
                     ],
                 };
             }
        */

        let courses = await Courses.findAll({ order: [['updatedAt', 'DESC']] })
        res.status(200).json({
            courses: courses,
            success: true,
            message: "Get All Data Success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            success: false,
            message: "Failed to retrieve data"
        });
    }
};

exports.update = async (req, res) => {
    try {
        let updatecourses = {
            userId: req.profile.id,
            name: req.body.name
        }
        const courses = await Courses.update(updatecourses, { where: { id: req.params.coursesId } , order: [['updatedAt', 'DESC']]});
        res.status(200).json({
            courses: courses,
            success: true,
            message: "Update Successfully Courses"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: "error  While Update The Courses"
        });
    }

}

exports.delete = async (req, res) => {
    try {
        const courses = await Courses.destroy({ where: { id: req.params.coursesId } });
        res.status(200).json({
            courses: courses,
            success: true,
            message: "Delete Successfully Courses"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: 'Courses not found'
        });
    }
}

