"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsToMany(models.User, {
        through: "User_Task",
        foreignKey: "taskId",
      });
      Task.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
      Task.belongsTo(models.User, {
        foreignKey: "creatorId",
      });
      Task.hasMany(models.Comment, {
        foreignKey: "taskId",
      });
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      createDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      creatorId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["incomplete", "in progress", "complete", "approved"],
        defaultValue: "incomplete",
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
