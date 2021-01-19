const { Model, DataTypes } = require("sequelize");


//const validTypes = ["Viande", "Legume", "Fruit"];
//const validTpesCuisson = ["poele", "friture", "eau", "four"];

module.exports = function (sequelize, DataTypes) {
  class Ingredient extends Model {
    static associate(models) {
      // Ingredient.belongsToMany(models.Timers,{through: "Timers"})
      Ingredient.belongsToMany(models.Paniers, { through: "Englober" });
      Ingredient.belongsToMany(models.Recettes, { through: "Contenir" });
      Ingredient.hasMany(models.Timers);
      Ingredient.belongsTo(models.Users);
    }
  }

  Ingredient.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "le nom de cet ingrédient exist déjà",
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //   return this.getDataValue("types").split(",");
        // },
        // set(types) {
        //   this.setDataValue("types", types.join());
        // },
        // validate: {
        //   isTypesValid(value) {
        //     if (!value) {
        //       throw new Error("Un Ingredient doit contenir au moin un type");
        //     }
        //     if (!value.split(",").length > 1) {
        //       throw new Error(
        //         "Un Ingrédient ne doit pas contenir plusieurs type"
        //       );
        //     }
        //     value.split(",").forEach((type) => {
        //       if (!valueTypes.include(type)) {
        //         throw new Error(
        //           `le type de l'ingrédient doit appartenir à la liste ${validTypes}`
        //         );
        //       }
        //     });
        //   },
        // },
      },
      cuisson: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //   return this.getDataValue("cuisson").split(",");
        // },
        // set(types) {
        //   this.setDataValue("cuisson", cuisson.join());
        // },
        // validate: {
        //   isTypesValid(value) {
        //     if (!value) {
        //       throw new Error(
        //         "Un Ingredient doit contenir au moin un type de cuisson"
        //       );
        //     }
        //     if (!value.split(",").length > 1) {
        //       throw new Error(
        //         "Un Ingrédient ne doit pas contenir plusieurs type de cuisson"
        //       );
        //     }
        //     value.split(",").forEach((type) => {
        //       if (!validTpesCuisson.include(type)) {
        //         throw new Error(
        //           `le type de cuisson doit appartenir à la liste ${validTpesCuisson}`
        //         );
        //       }
        //     });
        //   },
        // },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ingredients",
    }
  );
  return Ingredient;
};
