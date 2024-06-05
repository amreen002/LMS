'use strict';
<<<<<<< HEAD
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
=======
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'departmentId' });    
      this.hasMany(models.SaleTeam, { foreignKey: 'roleId' });   
      this.hasMany(models.TelecallerDepartment, { foreignKey: 'roleId' });  
      this.hasMany(models.FrontDesk, { foreignKey: 'roleId' }); 
<<<<<<< HEAD
=======
      this.hasMany(models.Teacher, { foreignKey: 'roleId' }); 
      this.hasMany(models.Student, { foreignKey: 'roleId' }); 
      this.hasMany(models.Courses, { foreignKey: 'userId' });  
      this.hasMany(models.Batch, { foreignKey: 'userId' });  
      this.hasMany(models.Quize, { foreignKey: 'userId' }); 
      this.hasMany(models.Categories, { foreignKey: 'userId' });  
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING
    },
    userName: {
      type: DataTypes.STRING
    },
    phoneNumber: {
<<<<<<< HEAD
      type: DataTypes.STRING
=======
      type: DataTypes.BIGINT
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    resentPassword: {
      type: DataTypes.STRING
    },
    passwordResetOtp: {
      type: DataTypes.STRING
    },
    expireToken: {
      type: DataTypes.STRING
    },
    assignToUsers:{
      type: DataTypes.INTEGER
    },
    departmentId: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    teacherId: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    studentId: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    roleName: {
      type: DataTypes.ENUM('Super Admin','Admin','Sub Admin')
    },
    image: {
      type: DataTypes.STRING
    },
    src: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.TEXT('long')
    },
    active: {
      type: DataTypes.BOOLEAN,  //default value is false if not mentioned otherwise
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};