'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        field: 'Title', 
        type: Sequelize.STRING
      },
      CoursesId: {
        field: 'CoursesId', 
        type: Sequelize.INTEGER
      },
      TopicId: {
        field: 'TopicId', 
        type: Sequelize.INTEGER
      },
      VideoUplod: {
        field: 'VideoUplod', 
        type: Sequelize.STRING
      },
      VideoIframe: {
        field: 'VideoIframe', 
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Videos');
  }
};