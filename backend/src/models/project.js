"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { foreignKey: "customerId" });
      Project.belongsToMany(models.User, {
        through: "Project_User",
        foreignKey: "projectId",
      });
      // mising hasMany tasks and comments
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
