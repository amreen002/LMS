'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Topic.init({
    name:  {
      field: 'name',
      type: DataTypes.STRING,
    },
    CoursesId: {
      field: 'CoursesId',
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};