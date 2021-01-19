const { response } = require("express");
const express = require("express");
const db = require("../../models");
const { Timers, Ingredients, Users } = require("../../models");

class TimerController {

  //creer timer avec UserId et IngredientId
  createTimerbyUserId(req, res) {
    db.Timers.create({
      time: req.body.time,
      IngredientId: parseInt(req.body.ingredientId),
      UserId: parseInt(req.body.userId) || null,
    })
      .then((timers) => {
        const message = `le timer a bien été créé`;
        res.json({ message, data: timers });
      })
      .catch((error) => res.json(error));
  }

  //donner tous les timers avec Ingredients et User correspondant
  getallTimer(req, res) {
    db.Timers.findAll({
      include: [
        { model: db.Ingredients, as: "Ingredients", attributes: ["nom"] },
        { model: db.Users, as: "Users", attributes: ["pseudo"] },
      ],
    }).then((users) => {
      const message = "ok";
      res.json({ message, data: users });
    });
  }

  //donner les timer avec Id User
  getTimerByUserId({ params: { id }, res }) {
    db.Users.findByPk(id, { include: ["Timers", 'Ingredients'] })
      .then((timers, ingredients) => {
        const message = "ok";
        res.json({ message, data: timers });
      })
      .catch((error) => res.json(error));
  }

  
  //modifier le timers

  //supprimer le timer
}

module.exports = new TimerController();
