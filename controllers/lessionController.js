
const { Lession, Role, User } = require('../models')
exports.create = async (req, res) => {
    try {

        const lession = await Lession.create(req.body)

        return res.status(200).json({
            lession: lession,
            success: true,
            message: "Lession Created SuccessFully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            success: false,
            message: "Lession  error"
        })
    }

}

exports.findOne = async (req, res) => {
    try {
        const lession = await Lession.findOne({ where: { id: req.params.lessionId }, include: [{ model: User }] });
        res.status(200).json({
            lession: lession,
            success: true,
            message: "get one Lession by ID"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: 'error in getting the Lession'
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        let where = {}
        let lession = await Lession.findAll({ where, include: [{ model: User, include: [{ model: Role }] }] });
        res.status(200).json({
            lession: lession,
            success: true,
            message: "Get All Lession Data Success"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: "Get Not All  Lession Data Success"
        });
    }
}

exports.update = async (req, res) => {
    try {
        const lession = await Lession.update(req.body, { where: { id: req.params.lessionId } });
        res.status(200).json({
            lession: lession,
            success: true,
            message: "Update Successfully Lession"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: "error  While Update The Lession"
        });
    }

}

exports.delete = async (req, res) => {
    try {
        const lession = await Lession.destroy({ where: { id: req.params.lessionId } });
        res.status(200).json({
            lession: lession,
            success: true,
            message: "Delete Successfully Lession"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: 'Lession not found'
        });
    }
}


