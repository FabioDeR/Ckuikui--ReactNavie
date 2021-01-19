const { Sequelize, DataTypes } = require("sequelize");

const db = {};

const sequelize = new Sequelize("Ckuikui", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

// const sequelize = new Sequelize('Ckuikui', 'sa', '', {
//   dialect: 'mssql',
//   host:'localhost',
//   port : "3000",
//   operatorsAliases: false,
//   pool: {
//   max: 5,
//   min: 0,
//   acquire: 30000,
//   idle: 10000 
// });

db["Users"] = require("../modules/user/user.model")(sequelize, DataTypes);
db["Ingredients"] = require("../modules/ingredient/ingredient.model")(sequelize,DataTypes);
db["Timers"]= require("../modules/timer/timer.model")(sequelize, DataTypes);
db["Recettes"]= require("../modules/recette/recette.model")(sequelize, DataTypes);
db["Paniers"]=require("../modules/Panier/panier.model")(sequelize,DataTypes);             
  
  


Object.keys(db).forEach((model) => {  
  console.log(model);
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db["sequelize"] = sequelize;
db["Sequelize"] = Sequelize;

module.exports = db;
