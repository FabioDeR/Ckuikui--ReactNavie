const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  class Timer extends Model {
    static associate(models) {
      // Timer.belongsTo(models.Ingredients);
      // Timer.belongsToMany(models.Users);
      Timer.belongsTo(models.Ingredients, {
        as: "Ingredients",
        foreignKey: "IngredientId",
      });
      Timer.belongsTo(models.Users, { as: "Users", foreignKey: "UserId" });
    }
  }

  Timer.init(
    {
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Timers",
    }
  );
  return Timer;
};
