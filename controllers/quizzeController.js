
const { Quize, Role, User, Categories,Teacher, Batch, sequelize } = require('../models')

exports.create = async (req, res) => {
    try {
        req.body.userId = req.profile.id;
        const EasyQuestions = JSON.parse(req.body.EasyQuestions);
        const MediumQuestions = JSON.parse(req.body.MediumQuestions);
        const HardQuestions = JSON.parse(req.body.HardQuestions);
        let dataTolotal = EasyQuestions + MediumQuestions + HardQuestions
        let totalmarks
        req.body.TotalQuestions = dataTolotal
        totalmarks= (EasyQuestions*1)+(MediumQuestions*2)+(HardQuestions*4)
        req.body.TotalMarks = totalmarks
        const quizze = await Quize.create(req.body)
        return res.status(200).json({
            quizze: quizze,
            success: true,
            message: "Quizze Created SuccessFully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            success: false,
            message: "Quizze error"
        })
    }

}

exports.findOne = async (req, res) => {
    try {
        const quizze = await Quize.findOne({ where: { id: req.params.quizzeId }, include: [{ model: User, include: [{ model: Role }] }, { model: Categories }, { model: Batch }] });
        res.status(200).json({
            quizze: quizze,
            success: true,
            message: "get one Quizze by ID"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: 'error in getting the Quizze'
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        let where = {}
        let quizze = await Quize.findAll({
            where, attributes: [
                'QuizzName',
                'QuizzStartTime',
                'QuizzEndTime',
                'QuizzTestDuration',
                'EasyQuestions',
                'MediumQuestions',
                'HardQuestions',
                'TotalQuestions',
                'TotalMarks',
                'Instructions',
                'BatchId',
                'QuizzCategoryId',
                'userId'
            ], include: [{ model: User, include: [{ model: Role }] }, { model: Categories }, { model: Batch ,include:[{model :Teacher}]}]
        });


        /*    const formatTime = (time) => {
               const date = new Date(time);
               const year = date.getFullYear();
               const month = String(date.getMonth() + 1).padStart(2, '0');
               const day = String(date.getDate()).padStart(2, '0');
               let hours = date.getHours();
               const minutes = String(date.getMinutes()).padStart(2, '0');
               const newformat = hours >= 12 ? 'PM' : 'AM';
               hours = hours % 12;
               hours = hours ? hours : 12;
               console.log(`${year}-${month}-${day} ${hours}:${minutes} ${newformat}`)
               return `${year}-${month}-${day} ${hours}:${minutes} ${newformat}`;
           }; */

        for (let index = 0; index < quizze.length; index++) {
            let startTime = quizze[index].QuizzStartTime;
            let endTime = quizze[index].QuizzEndTime;
            let quiz = quizze[index];
            // Format Start Time
            let formattedStartTime = startTime.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            quiz.QuizzStartTime = formattedStartTime;
            // Format End Time
            let formattedEndTime = endTime.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            quiz.QuizzEndTime = formattedEndTime;
        }




        res.status(200).json({
            quizze: quizze,
            success: true,
            message: "Get All Quizze Data Success"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: "Get Not All Quizze Success"
        });
    }
}

exports.update = async (req, res) => {
    try {
        req.body.userId = req.profile.id;
        const EasyQuestions = JSON.parse(req.body.EasyQuestions);
        const MediumQuestions = JSON.parse(req.body.MediumQuestions);
        const HardQuestions = JSON.parse(req.body.HardQuestions);
        let dataTolota = EasyQuestions + MediumQuestions + HardQuestions
        let totalmarks
        req.body.TotalQuestions = dataTolota
        totalmarks= (EasyQuestions*1)+(MediumQuestions*2)+(HardQuestions*4)
        req.body.TotalMarks = totalmarks
        const quizze = await Quize.update(req.body, { where: { id: req.params.quizzeId } });
        res.status(200).json({
            quizze: quizze,
            success: true,
            message: "Update Successfully Quizze"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: "error  While Update The Quizze"
        });
    }

}

exports.delete = async (req, res) => {
    try {
        const quizze = await Quize.destroy({ where: { id: req.params.quizzeId } });
        res.status(200).json({
            quizze: quizze,
            success: true,
            message: "Delete Successfully Quizze"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: 'Quizze not found'
        });
    }
}

