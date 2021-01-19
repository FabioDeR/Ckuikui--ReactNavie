const express = require('express')
const PanierController = require('./panier.controller')

const router = express.Router()

    //post
    router.post("/create", PanierController.postIngredient)

    //get
    router.get('/:id',PanierController.getPanierByUserId)


module.exports = router