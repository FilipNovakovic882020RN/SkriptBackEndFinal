'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rezisers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Ime:{
        type: Sequelize.STRING,
        allowNull: false
      },
      Prezime:{
        type: Sequelize.STRING,
        allowNull: false
      },
      filmId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      DatumRodjenja:{
        type: Sequelize.STRING,
        allowNull: false
      },
      MestoRodjenja:{
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
    await queryInterface.dropTable('Rezisers');
  }
};