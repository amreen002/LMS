'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    static associate(models) {
      this.hasMany(models.FrontDesk, { foreignKey: 'coursesId' });  
     
    }
  }
  Courses.init({
    name: {
      type: DataTypes.STRING
    },
    userId:{
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};