const express = require('express');
let router = express.Router();
let video = require('../controllers/videoController');
let {checkauth,getLogedInUser} = require('../middlware/userAuth')
router.post('/video', checkauth, getLogedInUser, video.create)

router.get('/video',checkauth, getLogedInUser, video.findAll);

router.get('/video/:videoId', checkauth, getLogedInUser,video.findOne);

router.put('/video/:videoId', checkauth, getLogedInUser, video.update);

router.delete('/video/:videoId', checkauth, getLogedInUser, video.delete);

module.exports = router;