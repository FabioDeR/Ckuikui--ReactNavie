const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  class Panier extends Model {
    static associate(models) {
      Panier.belongsTo(models.Users);      
      Panier.belongsToMany(models.Ingredients, { through: "Englober" })
    }
  }
  Panier.init(
    {
      nom: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      
    },
    {
      sequelize,
      modelName: "Paniers"
    }
  );
  return Panier;
};
