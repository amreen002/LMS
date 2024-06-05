const express = require('express');
let router = express.Router();
let courses = require('../controllers/coursesController');
let {checkauth,getLogedInUser} = require('../middlware/userAuth')
router.post('/addcourses', checkauth, getLogedInUser, courses.create)

<<<<<<< HEAD
<<<<<<< HEAD
router.get('/listcourses',checkauth, getLogedInUser, courses.findAll);

router.get('/listcourses/:coursesId', checkauth, getLogedInUser,courses.findOne);
=======
router.get('/listcourses', checkauth, getLogedInUser,courses.findAll);
=======
router.get('/listcourses', /* checkauth, getLogedInUser */courses.findAll);
>>>>>>> 2660f98d96b6a73e799f3a0179058cd449f2020f

router.get('/listcourses/:coursesId', checkauth, getLogedInUser, courses.findOne);

router.get('/coursecode/:coursecodeId',checkauth, getLogedInUser,courses.coursecode);

router.get('/batche/:coursecodeId', checkauth, getLogedInUser,courses.coursebatches);

router.get('/students/:coursecodeId',checkauth, getLogedInUser,courses.coursestudents);
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd

router.put('/viewscourses/:coursesId', checkauth, getLogedInUser, courses.update);

router.delete('/deletecourses/:coursesId', checkauth, getLogedInUser, courses.delete);

<<<<<<< HEAD
=======
router.put('/addcontentcourses/:coursesId', checkauth, getLogedInUser, courses.addcontentcourses);
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
module.exports = router;