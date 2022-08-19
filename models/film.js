'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Reziser}) {
      // define association here 
      this.hasOne(Reziser, { foreignKey: 'filmId', as: 'rezisers', onDelete: 'cascade', hooks: true });
      //this.hasMany(Glumac, { foreignKey: 'filmId', as: 'glumac', onDelete: 'cascade', hooks: true });
    }
  };
  Film.init({
    Naziv:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Reziser:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Glumac:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Trajanje:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Count:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};