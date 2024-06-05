'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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