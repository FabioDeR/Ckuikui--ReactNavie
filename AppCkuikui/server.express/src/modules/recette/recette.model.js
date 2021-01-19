const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  class Recette extends Model {
    static associate(models) {
      //Recette.belongsToMany(models.Users, {through: "Like"})
      // Recette.belongsToMany(models.Ingredients,{through : "ContenierRandI"})
      Recette.belongsToMany(models.Ingredients, { through: "Contenir" });
      //Recette.belongsTo(models.Ingredients)
    }
  }
  Recette.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Recettes",
    }
  );
  return Recette;
};
