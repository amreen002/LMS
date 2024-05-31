
const { Op, where, } = require('sequelize');
const { Courses, Batch, User, Role, Categories, Student, Address,Teacher, sequelize } = require('../models')


const generateEnquiryId = async (id) => {
    try {

        const prefix = "COB";
        const paddedId = id.toString().padStart(3, '0'); // Ensures the ID is at least 3 digits
        // Get current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

        const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const padId = id.toString(); // Ensure CoursesId is converted to string

        return `${prefix}${paddedId}${timestamp}${suffix}${padId}`;
    } catch (error) {
        console.error(error);
        throw new Error("Error generating BatchEniqueId");
    }
};
exports.create = async (req, res) => {
    let transaction = await sequelize.transaction();
    try {
        req.body.userId = req.profile.id;
        let courses = await Courses.create(req.body, { transaction })
        const CourseCode = await generateEnquiryId(courses.id);
        await Courses.update(
            { CourseCode: CourseCode.toString() },
            { where: { id: courses.id }, transaction }
        );
        await transaction.commit();
        return res.status(200).json({
            courses: courses,
            success: true,
            message: "Courses Created SuccessFully"
        })
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        return res.status(500).json({
            error: error,
            success: false,
            message: "Courses error"
        })
    }

}

exports.findOne = async (req, res) => {
    try {
        const courses = await Courses.findOne({ where: { id: req.params.coursesId }, include: [{ model: User, include: [{ model: Role }] }, { model: Categories }, { model: Student }], order: [['updatedAt', 'DESC']] });
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
        let courses = await Courses.findAll({
            attributes: [
                'id',
                'name',
                'CourseDuration',
                'CoursePrice',
                'CourseCategoryId',
                'userId',
                'CourseCode',
                // Counting the number of students for each course
                [sequelize.fn('COUNT', sequelize.col('Students.CoursesId')), 'studentCount'],
            ],
            include: [
                {
                    model: User,
                    include: [{ model: Role }]
                },
                {
                    model: Categories
                },
                {
                    model: Batch, include: [{ model: Teacher, }]
                },
                {
                    model: Student,
                    attributes: []
                }
            ],
            order: [['updatedAt', 'DESC']],
            group: ['Courses.id', 'Batches.id']
        });


        let totalStudentCount = 0;
        for (let index = 0; index < courses.length; index++) {
            totalStudentCount += parseInt(courses[index].getDataValue('studentCount'), 10);
        }
        res.status(200).json({
            courses: courses,
            coursescount: courses.length,
            totalStudentCount: totalStudentCount,
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
        const courseId = req.params.coursesId;
        let course = await Courses.findOne({ where: { id: courseId } });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Update the course
        await Courses.update(req.body, { where: { id: courseId } });

        // Fetch the updated course
        course = await Courses.findOne({ where: { id: courseId } });

        res.status(200).json({
            courses: course,
            success: true,
            message: "Course updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message || "An error occurred while updating the course",
            success: false,
            message: "Error while updating the course"
        });
    }
};

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

exports.addcontentcourses = async (req, res) => {
    let transaction = await sequelize.transaction();
    try {
        const courses = await Courses.put({ where: { id: req.params.coursesId }, transaction });
        if (courses) {
            await Topic.create(req.body, { where: { CoursesId: courses }, transaction })
            await Lession.create(req.body, { where: { CoursesId: courses }, transaction })
            await Video.create(req.body, { where: { CoursesId: courses }, transaction })
        }


        res.status(200).json({
            courses: courses,
            success: true,
            message: "Successfully Courses Content"
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: 'Courses Content not found'
        });
    }
}

exports.coursecode = async (req, res) => {
    try {
        let courseCode = req.params.coursecodeId;

        // SQL Query
        let coursesQuery = `
            SELECT
                courses.id,
                courses.name,
                courses.CoursePrice,
                courses.CourseCategoryId,
                courses.CourseCode,
                COUNT(DISTINCT students.id) AS studentCount,
                COUNT(DISTINCT batches.id) AS batchesCount,
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', students.id, 'CoursesId', students.CoursesId, 'Name', students.Name)
                ) AS students,
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', batches.id, 'CoursesId', batches.CoursesId, 'Title', batches.Title)
                ) AS batches,
                JSON_OBJECT('id', categories.id, 'name', categories.name) AS category,
                JSON_OBJECT('id', users.id, 'name', users.name) AS user
            FROM
                courses
            LEFT JOIN students ON students.CoursesId = courses.id
            LEFT JOIN batches ON batches.CoursesId = courses.id
            LEFT JOIN categories ON categories.id = courses.CourseCategoryId
            LEFT JOIN users ON users.id = courses.userId
            WHERE
                courses.CourseCode = :courseCode
            GROUP BY
                courses.id, categories.id, users.id
        `;

        // Execute the raw SQL query
        let courses = await sequelize.query(coursesQuery, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { courseCode: courseCode }
        });

        // Initialize total counts
        let totalStudentCount = 0;
        let totalBatchesCount = 0;

        // Sum the student and batch counts
        courses.forEach(course => {
            totalStudentCount += parseInt(course.studentCount, 10) || 0;
            totalBatchesCount += parseInt(course.batchesCount, 10) || 0;
        });

        res.status(200).json({
            courses: courses,
            coursescount: courses.length,
            totalStudentCount: totalStudentCount,
            totalBatchesCount: totalBatchesCount,
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
exports.coursestudents = async (req, res) => {
    let courseId = req.params.coursecodeId;

    try {
        let coursesbatch = await Student.findAll({
            where: {CoursesId:courseId},include: [{
                model: User, include:
                    [{ model: Role }]
            },
            { model: Address },
            { model: Courses },
            { model: Batch,  include: [{model: Teacher,}]},
            ],
            order: [['updatedAt', 'DESC']]})
    
        res.status(200).json({
            courses: coursesbatch,
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
}
exports.coursebatches = async (req, res) => {
    let courseId = req.params.coursecodeId;

    try {
        let coursesbatch = await Batch.findAll({
            where: {CoursesId:courseId},include: [{ model: Teacher }, { model: Courses }], order: [['updatedAt', 'DESC']]})
        res.status(200).json({
            courses: coursesbatch,
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
}