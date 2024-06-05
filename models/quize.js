'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' }); 
      this.belongsTo(models.Batch, { foreignKey: 'BatchId' }); 
      this.belongsTo(models.Categories, { foreignKey: 'QuizzCategoryId' }); 
    }
  }
  Quize.init({
    QuizzName: {
      field: 'QuizzName',
      type: DataTypes.STRING
    },
    QuizzStartTime: {
      field: 'QuizzStartTime',
      type: DataTypes.DATE,
    },
    QuizzEndTime: {
      field: 'QuizzEndTime',
      type: DataTypes.DATE,
    },
    QuizzTestDuration: {
      field: 'QuizzTestDuration',
      type: DataTypes.INTEGER,
    },
    EasyQuestions: {
      field: 'EasyQuestions',
      type: DataTypes.INTEGER,
    },
    MediumQuestions: {
      field: 'MediumQuestions',
      type: DataTypes.INTEGER
    },
    HardQuestions: {
      field: 'HardQuestions',
      type: DataTypes.INTEGER
    },
    TotalQuestions:{
      field: 'TotalQuestions',
      type: DataTypes.INTEGER
    },
    TotalMarks:{
      field: 'TotalMarks',
      type: DataTypes.INTEGER
    },
    Instructions:{
      field: 'Instructions',
      type: DataTypes.TEXT('long')
    },
    BatchId:{
      field: 'BatchId',
      type: DataTypes.INTEGER
    },
    QuizzCategoryId:{
      field: 'QuizzCategoryId',
      type: DataTypes.INTEGER
    },
    userId:{
      field: 'userId',
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Quize',
  });
  return Quize;
};