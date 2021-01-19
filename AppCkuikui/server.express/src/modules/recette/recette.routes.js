const express = require('express')
const RecetteController = require('./recette.controller')


const router = express.Router();


//route de création
router.post('/create', RecetteController.createRecette)

//donne les recetttes
router.get("/all", RecetteController.getRecetteAll)

//donner les recettes avec id
router.get('/:id', RecetteController.getRecetteById)

//donner recette par le nom
router.get('/', RecetteController.getRecetteByName)


module.exports = router

