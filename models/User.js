const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class User extends Model {}
User.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ["admin", "user"],
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = { User: User };
