const express = require("express");
const { Op } = require("sequelize");
const { Recettes } = require("../../models");
const db = require("../../models");

class RecetteController {
  createRecette(req, res) {
    db.Recettes.create({
      nom: req.body.nom,
      photo: req.body.photo,
      description: req.body.description,
      categorie: req.body.categorie,
    })
      .then((recette) => {
        //recette.setIngredients(1);
        req.body.Ingredient.forEach((element) => {
          recette.setIngredients(element);
        }); //TODO
        const message = `recette a été créé`;
        res.json({ message, data: recette });
      })
      .catch((error) => {
        console.log("error =>>>>>>", error);
        const message = `recette n'a pas été`;
        res.status(400).json({ message, data: error });
      });
  }

  //donner toutes les recettes
  getRecetteAll(req, res) {
    db.Recettes.findAll({
      include: [{ model: db.Ingredients, as: "Ingredients" }],
    })
      .then((recette) => {
        const message = "ok";
        res.json({ message, data: recette });
      })
      .catch((error) => {
        const message = "no ok";
        res.json({ message, data: error });
      });
  }
  //donner recette avec id
  getRecetteById({ params: { id } }, res) {
    db.Recettes.findByPk(id, {
      include: ["Ingredients"],
    })
      .then((recette) => {
        const message = "ok";
        res.json({ message, data: recette });
      })
      .catch((error) => {
        const message = `no ok !`;
        res.json({ message, data: error });
      });
  }
  //chercher donner la recette par le nom
  getRecetteByName(req, res) {
    if (req.query.nom) {
      const nom = req.query.nom;
      if (nom.length < 3) {
        const message = `le terme rechecher doit contenir au moin 3 caractère`;
        return res.status(400).json({ message });
      }
      return Recettes.findAndCountAll({
        where: {
          nom: {
            [Op.like]: `%${nom}%`,
          },
        },
        order: ["nom"],
        include: "Ingredients",
      }).then(({ count, rows }) => {
        const message = `il a ${count} correspondant au terme de recherche ${nom}`;
        res.json({ message, data: rows });
      });
    } else {
      Recettes.findAll({ order: ["nom"] })
        .then((recettes) => {
          const message = `Ok !!!!`;
          res.json({ message, data: recettes });
        })
        .catch((error) => {
          const message = `La liste des recette n'a pas pu être récupéré`;
          res.status(500).json({ message, data: error });
        });
    }
  }
}

module.exports = new RecetteController();
