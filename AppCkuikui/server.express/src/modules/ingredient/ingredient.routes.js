const express = require("express");
const IngredientController = require("./ingredient.controller");


const router = express.Router();

// route de création
router.post("/create", IngredientController.createIngredient);

//donner tous les ingrédients
router.get("/all", IngredientController.getAllIngredient);
//donner tous les ingredient avec leur timer et userId
router.get("/timer", IngredientController.getAllIngredientWithTimer);
//donner tous les ingredient par UserId
router.get("/users/:id",IngredientController.getIngredientByUserId);
//donner ingredient par id
router.get("/ingredient/:id", IngredientController.getIngredientbyId);
//donner rechercher ingredient par son nom
router.get("/", IngredientController.getIngredientByName);

//donner rechercher ingredient par son type 
//router.get("/", IngredientController.getIngredientByTypes);

//modifier l'ingredient
router.put("/:id([0-9]+)", IngredientController.updateIngredient);

module.exports = router;
