"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group);
      User.belongsToMany(models.Project, {
        through: "Project_User",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Task, {
        through: "User_Task",
        foreignKey: "userId",
      });
      User.hasMany(models.Task, {
        foreignKey: "creatorId",
      });
      User.hasMany(models.Project, {
        foreignKey: "customerId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
      phone: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
