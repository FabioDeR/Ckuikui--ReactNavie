const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  class User extends Model {
    static associate(models) {
      //one to Many avec Panier

      //many to many avec recette
      //User.belongsToMany(models.Recettes, { through: "Like" });      
      User.hasMany(models.Timers);
      User.hasMany(models.Ingredients);
      //one to Many avec Panier
      User.hasOne(models.Paniers)

    }
  }

  User.init(
    {
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "le nom est déjà pris",
        },
        validate: {
          notEmpty: { msg: `Le champs Pseudo ne peut être vide` },
          notNull: { msg: `le Pseudo est requis` },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Malheureusement il existe déjà un email inscrit`,
        },
        validate: {
          isEmail: true,
          notEmpty: { msg: `Le champs email ne peut être vide` },
          notNull: { msg: `l'email est requis` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 120],
            msg:
              "désolé mais le mot de passe doit contenir min 6 et max 120caractère",
          },
          notEmpty: { msg: `Le champs Password ne peut être vide` },
          notNull: {
            msg: "Le password est un élément requis",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return User;
};
