'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init({
    Title: {
      field: 'Title',
      type: DataTypes.STRING
    },
    CoursesId:{ 
      field: 'CoursesId', 
      type: DataTypes.INTEGER
     },
    TopicId:{ 
      field: 'TopicId', 
      type: DataTypes.INTEGER
     },
    VideoUplod: { 
      field: 'VideoUplod', 
      type: DataTypes.STRING
     },
    VideoIframe: { 
      field: 'VideoIframe', 
      type: DataTypes.STRING
     },
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};