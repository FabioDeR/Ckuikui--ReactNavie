const express = require("express");
const { Users, Timers, Ingredients } = require("../../models");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const accessTokenSecret = "test1234";

class UserController {
  //création d'un user
  createUser(req, res) {
    db.Users.create(req.body)
      .then((users) => {
        const message = `L'utilisateur ${req.body.pseudo} a bien été créé`;
        res.json({ message, data: users });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `l'utilisateur n'a pas pu être créé`;
        res.status(500).json({ message, data: error });
      });
  }

  //login
  loggin({ body }, response) {
    db.Users.findOne({
      where: { pseudo: body.pseudo, password: body.password },
    })
      .then( (data) => {
        // response.json({user : data});
        if (data != null) {
          const accessToken = jwt.sign(
            { pseudo: data.pseudo, role: data.role },
            accessTokenSecret
          );
          response.json({
            User: data,
            token: accessToken,
          });
        } else {
          response.json("NOOOOT OOOKKKK !!! HAAAAA");
        }
      })
      .catch((err) => response.json(err));
  }

  //trouver donner tous les users
  getAllUser(req, res) {
    db.Users.findAll({ include: [{ model: db.Ingredients }, "Timers"] })
      .then((users) => {
        const message = `la liste des utilisateur a été trouvé`;
        res.json({ message, data: users });
      })
      .catch((error) => {
        const message = `la liste des users n'a pas été trouvé`;
        res.status(500).json({ message, data: error });
      });
  }

  //pouvoir modifié
  updateUsers(req, res) {
    const id = req.params.id;
    Users.update(req.body, {
      where: { id: id },
    }).then((_) => {
      return Users.findByPk(id)
        .then((user) => {
          if (user === null) {
            const message = `l'utilisateur a modifié n'existe pas`;
            return res.status(404).json({ message });
          }
          const message = `l'utilisateur ${user.pseudo} a bien été modifié`;
          res.json({ message, data: user });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          if (error instanceof UniqueConstraintError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          const message = `l'identifiant n'a pas pu être modifié`;
          res.status(500).json({ message, data: error });
        });
    });
  }

  // donne un User par son Id
  getUserbyId(req, res) {
    db.Users.findByPk(req.params.id, {
      include: [{ model: db.Ingredients }, "Timers"],
    })
      .then((user) => {
        if (user === null) {
          const message = `l'utilisateur demandée n'existe pas`;
          return res.status(404).json({ message });
        }
        const message = `l'utilisateur ${user.pseudo} a bien été trouvé`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message = `l'utilisateur n'a pas être récupérer`;
        res.status(500).json({ message, data: error });
      });
  }

  //donner user par une recherche de nom
  getUserByName(req, res) {
    if (req.query.pseudo) {
      const pseudo = req.query.pseudo;
      //const limit = parseInt(req.query.limit) || 5;
      if (pseudo.length < 3) {
        const message = `le terme rechecher doit contenir au moin 3 caractère`;
        return res.status(400).json({ message });
      }
      return Users.findAndCountAll({
        where: {
          pseudo: {
            [Op.like]: `%${pseudo}%`,
          },
        },
        order: ["pseudo"],
        include: ["Ingredients", { model: db.Timers }],

        //limit: limit,
      }).then(({ count, rows }) => {
        const message = `il a ${count} correspondant au terme de rechercher ${pseudo}`;
        res.json({ message, data: rows });
      });
    } else {
      Users.findAll({ order: ["pseudo"] })
        .then((users) => {
          const message = `Ok!!!`;
          res.json({ message, data: users });
        })
        .catch((error) => {
          const message = `La liste des pseudo n'a pas pu être récupérer`;
          res.status(500).json({ message, data: error });
        });
    }
  }

  //donner un user par son email
  getUserByEmail(req, res) {
    if (req.query.email) {
      const email = req.query.email;
      //const limit = parseInt(req.query.limit) || 6;
      if (email.length < 4) {
        const message = `le terme recherche doit contenir au moin 4 caractère`;
        return res.status(400).json({ message });
      }
      return Users.findAndCountAll({
        where: {
          email: {
            [Op.like]: `%${email}%`,
          },
        },
        order: ["email"],
        // limit: limit,
      }).then(({ count, rows }) => {
        const message = `il a ${count} correspondant au terme de recherche ${email}`;
        res.json({ message, data: rows });
      });
    } else {
      Users.findAll({ order: ["email"] })
        .then((users) => {
          const message = `Ok!!!`;
          res.json({ message, data: users });
        })
        .catch((error) => {
          const message = `la liste des email n'a pas pu être récupérer`;
          res.status(500).json({ message, data: error });
        });
    }
  }

  //pouvoir delete
  deleteUser({ params: { id } }, res, req) {
    db.Users.findByPk(id).then((user) => {
      if (user === null) {
        const message = `l'utilisateur demandée n'existe pas`;
        return res.status(404).json({ message });
      }
      const usersDelete = user;
      return Users.destroy({
        where: { id: user.id },
      })
        .then((_) => {
          const message = `l'utilisateur ${usersDelete.pseudo} avec l'identifiant n°${usersDelete.id} à bien été supprimer`;
          res.json({ message, data: usersDelete });
        })
        .catch((error) => {
          const message = `l'utilisateur n'a pas pu être`;
          res.status(500).json({ message, data: error });
        });
    });
  }
}

module.exports = new UserController();
