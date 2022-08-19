'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Films', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Naziv:{
        type: Sequelize.STRING,
        allowNull: false
      },
      Reziser:{
        type: Sequelize.STRING,
        allowNull: false
      },
      Glumac:{
        type: Sequelize.STRING,
        allowNull: false
      },
      Trajanje:{
        type: Sequelize.STRING,
        allowNull: false
      },
      Count:{
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Films');
  }
};