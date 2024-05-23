'use strict';
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
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'departmentId' });    
      this.hasMany(models.SaleTeam, { foreignKey: 'roleId' });   
      this.hasMany(models.TelecallerDepartment, { foreignKey: 'roleId' });  
      this.hasMany(models.FrontDesk, { foreignKey: 'roleId' }); 
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
      type: DataTypes.STRING
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