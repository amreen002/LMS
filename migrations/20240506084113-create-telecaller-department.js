'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TelecallerDepartments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
<<<<<<< HEAD
        type: Sequelize.DATE
=======
        type: Sequelize.DATEONLY
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
      },
      TelecallerCheckbox: {
        field: 'TelecallerCheckbox',
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      enquiryId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        type: Sequelize.BIGINT
      },
      email: {
        type: Sequelize.STRING
      },
      workingStatus: {
        type: Sequelize.STRING
      },
      leadPlatform: {
        type: Sequelize.STRING
      },
      telecallerPersonName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('1st Call', '2nd Call', '3rd Call', '4rd Call', 'Not Responding (N/R)', 'Other'),
      },
      address: {
        type: Sequelize.STRING
      },
      userRoleName: {
        type: Sequelize.STRING
      },
      visitDate:
      {
<<<<<<< HEAD
        type: Sequelize.DATE
=======
        type: Sequelize.DATEONLY
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
      },
      remark: {
        type: Sequelize.TEXT('long')
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TelecallerDepartments');
  }
};