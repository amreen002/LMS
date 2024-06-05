'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lession extends Model {
    static associate(models) {
      this.belongsTo(models.Courses, { foreignKey: 'CoursesId' });
    }
  }
  Lession.init({
    LessionTitle: {
      field: 'LessionTitle',
      type: DataTypes.STRING,
    },
    CoursesId: {
      field: 'CoursesId',
      type: DataTypes.INTEGER
    },
    TopicId: {
      field: 'TopicId',
      type: DataTypes.INTEGER
    },
    LessionUpload: {
      field: 'LessionUpload',
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Lession',
  });
  return Lession;
};