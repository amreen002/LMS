const express = require('express');
let router = express.Router();
let courses = require('../controllers/coursesController');
let {checkauth,getLogedInUser} = require('../middlware/userAuth')
router.post('/addcourses', checkauth, getLogedInUser, courses.create)

router.get('/listcourses', checkauth, getLogedInUser,courses.findAll);

router.get('/listcourses/:coursesId', checkauth, getLogedInUser, courses.findOne);

router.get('/coursecode/:coursecodeId',checkauth, getLogedInUser,courses.coursecode);

router.get('/batche/:coursecodeId', checkauth, getLogedInUser,courses.coursebatches);

router.get('/students/:coursecodeId',checkauth, getLogedInUser,courses.coursestudents);

router.put('/viewscourses/:coursesId', checkauth, getLogedInUser, courses.update);

router.delete('/deletecourses/:coursesId', checkauth, getLogedInUser, courses.delete);

router.put('/addcontentcourses/:coursesId', checkauth, getLogedInUser, courses.addcontentcourses);
module.exports = router;