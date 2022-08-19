'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Glumac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Film}) {
      // define association here
      this.belongsTo(Film, {foreignKey: 'filmId', as: 'film'});
    }
  };
  Glumac.init({
    Ime:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Prezime:{
      type: DataTypes.STRING,
      allowNull: false
    },
    DatumRodjenja:{
      type: DataTypes.STRING,
      allowNull: false
    },
    MestoRodjenja:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Glumac',
  });
  return Glumac;
};