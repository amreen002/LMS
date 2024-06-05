'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class TelecallerDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'roleId' });  
    }
  }
  TelecallerDepartment.init({
    date: {
<<<<<<< HEAD
      type: DataTypes.DATE,
     /*  get() {
        return moment(this.getDataValue('date')).format('DD-MM-YYYY');
      }, */
=======
      type: DataTypes.DATEONLY,
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    },
    TelecallerCheckbox: {
      field: 'TelecallerCheckbox',
      type: DataTypes.BOOLEAN,
      defaultValue:0
    },
    enquiryId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    age: {
      type: DataTypes.INTEGER
    },
    phoneNumber: {
      type: DataTypes.BIGINT
    },
    email: {
      type: DataTypes.STRING
    },
    workingStatus: {
      type: DataTypes.STRING
    },
    leadPlatform: {
      type: DataTypes.STRING
    },
    telecallerPersonName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('1st Call', '2nd Call', '3rd Call', '4rd Call', 'Not Responding (N/R)', 'Other'),
    },
    address: {
      type: DataTypes.STRING
    },
    userRoleName: {
      type: DataTypes.STRING
    },
    visitDate: {
<<<<<<< HEAD
      type: DataTypes.DATE,
     /*  get() {
        return moment(this.getDataValue('visitDate')).format('DD-MM-YYYY');
      }, */
=======
      type: DataTypes.DATEONLY,
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
    },
    remark: {
      type: DataTypes.TEXT('long')
    }


  }, {
    sequelize,
    modelName: 'TelecallerDepartment',
  });
  return TelecallerDepartment;
};