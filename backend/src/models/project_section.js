"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project_Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project_Section.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
      Project_Section.hasMany(models.Section_Files, {
        foreignKey: "sectionId",
      });
    }
  }
  Project_Section.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project_Section",
    }
  );
  return Project_Section;
};
