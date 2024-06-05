const express = require('express');
let router = express.Router();
let lession = require('../controllers/lessionController');
let {checkauth,getLogedInUser} = require('../middlware/userAuth')
router.post('/lession', checkauth, getLogedInUser, lession.create)

router.get('/lession',checkauth, getLogedInUser, lession.findAll);

router.get('/lession/:lessionId', checkauth, getLogedInUser,lession.findOne);

router.put('/lession/:lessionId', checkauth, getLogedInUser, lession.update);

router.delete('/lession/:lessionId', checkauth, getLogedInUser, lession.delete);

module.exports = router;