const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Coin extends Model {}
Coin.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    symbol: DataTypes.STRING,
    launchDate: DataTypes.DATE,
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    website: DataTypes.STRING,
    twitter: DataTypes.STRING,
    telegram: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
  },
  { sequelize, modelName: "coin" }
);

module.exports = { Coin };
