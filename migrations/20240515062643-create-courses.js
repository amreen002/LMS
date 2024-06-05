'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      userId:{
        type: Sequelize.INTEGER,
      },
<<<<<<< HEAD
=======
      CoursePrice:{
        field: 'CoursePrice',
        type: Sequelize.DOUBLE(25,2),
      },
      CourseCategoryId:{
        field: 'CourseCategoryId',
        type: Sequelize.INTEGER,
      },
      CourseDuration :{
        field: 'CourseDuration',
        type: Sequelize.INTEGER,
      },
      CourseCode:{
        field: 'CourseCode',
        type: Sequelize.STRING,
      },
>>>>>>> 5765c38c72d7b75d4116b5360ac4e2bdfb80c8cd
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
    await queryInterface.dropTable('Courses');
  }
};