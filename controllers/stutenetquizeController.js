const { sequelize, StudentQuize, Questions, User, Role } = require('../models'); // Ensure models are correctly imported

exports.create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let studentsquize


        const studentQuizEntries = req.body.answers.map(answer => {
            // Convert seconds to formatted time
            const seconds = answer.TimeTaken; // Assuming answer.TimeTaken is in seconds
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            const formattedTime = `${hours}:${minutes}:${remainingSeconds}`;
        
            // Initialize element as an empty array
            let element = [];
        
            // Check if AnswersStudent is an array before using length
            if (Array.isArray(answer.AnswersStudent)) {
                element = answer.AnswersStudent; // Keep as array
            } else {
                // Handle the case where AnswersStudent is not an array
                element = answer.AnswersStudent; // Convert to array
            }
        
            // Convert element to a string (JSON format)
            const elementString = JSON.stringify(element);
        
            return {
                QuizeId: req.body.QuizeId,
                QuestionId: answer.QuestionId,
                AnswersStudent: elementString, // Save as string
                StudentId: req.profile.id,
                TimeTaken: formattedTime, // Use the formatted time here
            };
        });
        
        for (let studentQuiz of studentQuizEntries) {
            const question = await Questions.findOne({ where: { id: studentQuiz.QuestionId } });
            
            let isCorrect = false;
            const studentAnswer = JSON.parse(studentQuiz.AnswersStudent);
            // Check if both question and student answers are arrays
            if (Array.isArray(question.Answer) && Array.isArray(studentAnswer)) {
                // Sort and compare arrays
                const sortedQuestionAnswer = question.Answer.slice().sort();
                const sortedStudentAnswer = studentAnswer.slice().sort();
                isCorrect = JSON.stringify(sortedQuestionAnswer) === JSON.stringify(sortedStudentAnswer);
            } else {
                // For non-array answers
                isCorrect = question.Answer === studentAnswer;
            }

            studentQuiz.Correct = isCorrect ? 1 : 0;
            studentQuiz.Incorrect = isCorrect ? 0 : 1;
            studentsquize= await StudentQuize.create(studentQuiz, { transaction });
        }
        await transaction.commit();

        return res.status(200).json({
            studentsquize:studentsquize,
            success: true,
            message: "Created successfully"
        });

    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Error creating StudentQuize"
        });
    }
};




exports.findOne = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const studentsquize = await StudentQuize.findOne({ where: { id: req.params.studentquizeId }, order: [['updatedAt', 'DESC']], transaction });
        await transaction.commit();
        res.status(200).json({
            studentsquize: studentsquize,
            success: true,
            message: "get one Students Quize by ID"
        });
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        res.status(500).json({
            error: error,
            success: false,
            message: 'error in getting the Students Quize'
        });
    }
}

exports.findAll = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let where;
        let studentsquize;
        const loggedInUserId = req.profile.id;
        const loggedInUser = await User.findOne({
            where: { id: loggedInUserId },
            attributes: [
                "id",
                "name",
                "userName",
                "phoneNumber",
                "email",
                "assignToUsers",
                "departmentId",
                "teacherId",
                "studentId",
                "roleName",
                "image",
                "src",
                "address",
                "message",
                "active",
            ],
            include: [{ model: Role }],
            transaction
        });

        if (loggedInUser.Role.Name == "Admin" || loggedInUser.Role.Name == "Administrator") {
            where = {};
        } else {
            where = { StudentId: loggedInUserId };
        }
        
        studentsquize = await StudentQuize.findAll({
            where,
            order: [['updatedAt', 'DESC']],
            transaction,
        });

        let totalIncorrectCount = 0;
        let totalCorrectCount = 0;
        let totalCount = studentsquize.length;

        // Sum the incorrect and correct counts
        studentsquize.forEach(quize => {
            const correct = quize.Correct ? 1 : 0; 
            const incorrect = quize.Incorrect ? 1 : 0; 
            totalIncorrectCount += parseInt(incorrect, 10) || 0;
            totalCorrectCount += parseInt(correct, 10) || 0;
        });

        await transaction.commit();
        res.status(200).json({
            studentsquize: studentsquize,
            totalCount: totalCount,
            totalIncorrectCount: totalIncorrectCount,
            totalCorrectCount: totalCorrectCount,
            success: true,
            message: "Get All Data Success"
        });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            error: error,
            success: false,
            message: "Failed to retrieve data"
        });
    }
};

exports.findAllQuize = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let where;
        let studentsquize;
        const loggedInUserId = req.profile.id;
        const loggedInUser = await User.findOne({
            where: { id: loggedInUserId },
            attributes: [
                "id",
                "name",
                "userName",
                "phoneNumber",
                "email",
                "assignToUsers",
                "departmentId",
                "teacherId",
                "studentId",
                "roleName",
                "image",
                "src",
                "address",
                "message",
                "active",
            ],
            include: [{ model: Role }],
            transaction
        });

        if (loggedInUser.Role.Name == "Admin" || loggedInUser.Role.Name == "Administrator") {
            where = {};
        } else {
            where = { StudentId: loggedInUserId };
        }

        studentsquize = await StudentQuize.findAll({
            where:{QuizeId:req.params.studentquizeId },
            order: [['updatedAt', 'DESC']],
            transaction,
        });

        let totalIncorrectCount = 0;
        let totalCorrectCount = 0;
        let totalCount = studentsquize.length;

        // Sum the incorrect and correct counts
        studentsquize.forEach(quize => {
            const correct = quize.Correct ? 1 : 0; 
            const incorrect = quize.Incorrect ? 1 : 0; 
            totalIncorrectCount += parseInt(incorrect, 10) || 0;
            totalCorrectCount += parseInt(correct, 10) || 0;
        });

        await transaction.commit();
        res.status(200).json({
            studentsquize: studentsquize,
            totalCount: totalCount,
            totalIncorrectCount: totalIncorrectCount,
            totalCorrectCount: totalCorrectCount,
            success: true,
            message: "Get All Data Success"
        });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            error: error,
            success: false,
            message: "Failed to retrieve data"
        });
    }
};



