"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section_Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section_Files.belongsTo(models.Project_Section, {
        foreignKey: "sectionId",
      });
    }
  }
  Section_Files.init(
    {
      url: DataTypes.STRING,
      name: DataTypes.STRING,
      sectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Section_Files",
    }
  );
  return Section_Files;
};
