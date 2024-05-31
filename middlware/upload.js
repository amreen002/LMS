var express = require('express')
var multer  = require('multer')
const path = require('path')

const uploadPath = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

var upload = multer({storage:storage,limits:{
    fileSize: 1024*1024*10 
  },})

module.exports = upload;