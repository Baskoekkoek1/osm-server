'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  match.init({
    homeTeam: DataTypes.JSON,
    awayTeam: DataTypes.JSON,
    homeScore: DataTypes.INTEGER,
    awayScore: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'match',
  });
  return match;
};