'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    static associate(models) {
<<<<<<< HEAD
      this.hasMany(models.FrontDesk, { foreignKey: 'coursesId' });  
     
=======
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Categories, { foreignKey: 'CourseCategoryId' });
      this.hasMany(models.Batch, { foreignKey: 'CoursesId' });
      this.hasMany(models.Student, { foreignKey: 'CoursesId' });
      this.hasMany(models.FrontDesk, { foreignKey: 'coursesId' });
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    }
  }
  Courses.init({
    name: {
      type: DataTypes.STRING
    },
<<<<<<< HEAD
    userId:{
      type: DataTypes.INTEGER,
    },
=======
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
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};