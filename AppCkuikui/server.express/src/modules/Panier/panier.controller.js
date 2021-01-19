const express = require("express");
const db = require("../../models");

class PanierController {
  //création d'un panier avec l'id du User

  // createPanier(req,res){
  //     db.Paniers.create({
  //         nom : req.body.nom,
  //         UserId : req.body.userId
  //    })
  //    .then(paniers =>{
  //        const message =`C'est ok`
  //        res.json({message, data : paniers})
  //    })
  //    .catch(error =>{
  //        const message = `no ok`
  //        res.json({message, data : error})
  //    })
  // }
  //post ingredient dans le panier
  postIngredient(req, res) {
    db.Paniers.create({
      nom: req.body.nom,
      UserId: req.body.userId,
    }).then((panier) => {
      req.body.Ingredient.forEach((element) => {
        panier.setIngredients(element);
      });
      const message = `panier a bien été créé`;
      res.json({ message, data: panier });
    });
  }

  //get le panier du userId

  getPanierByUserId({ params: { id } }, res) {
    db.Users.findByPk(id, {
      include: [{ model: db.Paniers, as: "Panier" }, "Ingredients"],
    }).then((user) => {
      const message = `c'est ok`;
      res.json({ message, data: user });
    });
  }
}

module.exports = new PanierController();
