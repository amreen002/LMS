const express = require('express');
let router = express.Router();
let courses = require('../controllers/coursesController');
let {checkauth,getLogedInUser} = require('../middlware/userAuth')
router.post('/addcourses', checkauth, getLogedInUser, courses.create)

router.get('/listcourses',checkauth, getLogedInUser, courses.findAll);

router.get('/listcourses/:coursesId', checkauth, getLogedInUser,courses.findOne);

router.put('/viewscourses/:coursesId', checkauth, getLogedInUser, courses.update);

router.delete('/deletecourses/:coursesId', checkauth, getLogedInUser, courses.delete);

module.exports = router;