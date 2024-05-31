'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Categories, { foreignKey: 'CourseCategoryId' });
      this.hasMany(models.Batch, { foreignKey: 'CoursesId' });
      this.hasMany(models.Student, { foreignKey: 'CoursesId' });
      this.hasMany(models.FrontDesk, { foreignKey: 'coursesId' });
    }
  }
  Courses.init({
    name: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    CoursePrice: {
      field: 'CoursePrice',
      type: DataTypes.DOUBLE(25, 2),
    },
    CourseCategoryId: {
      field: 'CourseCategoryId',
      type: DataTypes.INTEGER,
    },
    CourseDuration :{
      field: 'CourseDuration',
      type: DataTypes.INTEGER,
    },
    CourseCode:{
      field: 'CourseCode',
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};