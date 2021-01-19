const express = require("express");
const { Ingredients, Users } = require("../../models");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const db = require("../../models");
const { Op } = require("sequelize");

class IngredientController {
  //creation d'un ingredient
  createIngredient(req, res) {
    db.Ingredients.create({
      nom: req.body.nom,
      types: req.body.types,
      cuisson: req.body.cuisson,
      photo: req.body.photo,
      UserId: req.body.UserId,
    })
      .then((ingredients) => {
        //ingredients.setUsers(parseInt(req.body.UserId))
        const message = `l'ingredient ${req.body.nom} a bien été créé`;
        res.json({ message, data: ingredients });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(500).json({ message, data: error });
        }
        const message = `l'ingredient n'as pus être créé`;
        res.status(500).json({ message, data: error });
      });
  }

  //donner tous les ingrédients
  getAllIngredient(req, res) {
    db.Ingredients.findAll()
      .then((ingredients) => {
        const message = `la liste de tous les ingrédients disponnible`;
        res.json({ message, data: ingredients });
      })
      .catch((error) => {
        const message = `la liste des ingredients n'a pas été trouvé`;
        res.status(500).json({ message, data: error });
      });
  }

  //donner les ingrédients avec les Id
  getIngredientbyId({ params: { id } }, res) {
    db.Ingredients.findByPk(id, {include : [{model: db.Users}]})
    .then((user) => {
      const message = "ok";
      res.json({ message, data: user });
    }).catch(error => {
      const message =`no ok !`
      res.json({message, data: error})
    })
  }

  //donner les ingrédient avec leur timer
  getAllIngredientWithTimer(req, res) {
    db.Ingredients.findAll({
      include: [
        { model: db.Timers, as: "Timers", attributes: ["userId", "time"] },
        //{model : db.Users, as : "Users", attributes: ['pseudo']}
      ],
    })
      .then((ingredients) => {
        const message = `la liste de tous les ingrédients disponnible`;
        res.json({ message, data: ingredients });
      })
      .catch((error) => {
        const message = `la liste des ingredients n'a pas été trouvé`;
        res.status(500).json({ message, data: error });
      });
  }

  //donner les ingrédients avec l'id User
  getIngredientByUserId({ params: { id }, res }) {
    db.Users.findByPk(id, { include: [{model: db.Ingredients, as: 'Ingredients', attributes:["nom"]}] })
      .then((ingredients) => {
        const message = "ok";
        res.json({ message, data: ingredients });
      })
      .catch((error) => res.json(error));
  }

  //recherche Ingredient avec le Nom et donne le timer

  getIngredientByName(req, res) {
    if (req.query.nom) {
      const nom = req.query.nom;
      if (nom.length < 3) {
        const message = `le terme rechecher doit contenir au moin 3 caractère`;
        return res.status(400).json({ message });
      }
      return Ingredients.findAndCountAll({
        where: {
          nom: {
            [Op.like]: `%${nom}%`,
          },
        },
        order: ["nom"],
        include: "Timers",
      }).then(({ count, rows }) => {
        const message = `il a ${count} correspondant au terme de recherche ${nom}`;
        res.json({ message, data: rows });
      });
    } else {
      Ingredients.findAll({ order: ["nom"] })
        .then((ingredients) => {
          const message = `Ok !!!!`;
          res.json({ message, data: ingredients });
        })
        .catch((error) => {
          const message = `La liste des ingrédients n'a pas pu être récupéré`;
          res.status(500).json({ message, data: error });
        });
    }
  }
  //recherche par le type de cuisson et donne le timer
  // getIngredientByTypes(req, res){
  //   if (req.query.types) {
  //     const types = req.query.types;
  //     if (types.length < 3) {
  //       const message = `le terme rechecher doit contenir au moin 3 caractère`;
  //       return res.status(400).json({ message });
  //     }
  //     return Ingredients.findAndCountAll({
  //       where: {
  //         types: {
  //           [Op.like]: `%${types}%`,
  //         },
  //       },
  //       order: ["types"],
  //       include: "Timers"
  //     }).then(({ count, rows }) => {
  //       const message = `il a ${count} correspondant au terme de recherche ${types}`;
  //       res.json({ message, data: rows });
  //     });
  //   } else {
  //     Ingredients.findAll({ order: ["types"] })
  //       .then((ingredients) => {
  //         const message = `Ok !!!!`;
  //         res.json({ message, data: ingredients });
  //       })
  //       .catch((error) => {
  //         const message = `La liste des types d' ingrédients n'a pas pu être récupéré`;
  //         res.status(500).json({ message, data: error });
  //       });
  //   }
  // }

  //recherche par le type de cuisson et donne le timer ( a envisageais )

  //modifier un Ingredient

  updateIngredient(req, res) {
    const id = req.params.id;
    Ingredients.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Ingredients.findByPk(id).then((ingredient) => {
          if (ingredient === null) {
            const message = `l'ingredient a été modifié`;
            return res.status(404).json({ message });
          }
          const message = `l'utilisateur ${ingredient.nom}a bien été modifié`;
          res.json({ message, data: ingredient });
        });
      })
      .catch((error) => {
        const message = `l'identifiant n'a pas pu être modifié`;
        res.status(500).json({ message, data: error });
      });
  }
  //delete un Ingredient
}

module.exports = new IngredientController();
