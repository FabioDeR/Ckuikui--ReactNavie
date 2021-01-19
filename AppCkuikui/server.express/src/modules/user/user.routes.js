const express = require("express");
const UserController = require("./user.controller");

const router = express.Router();

// route création
router.post("/create", UserController.createUser);

//route donner tous les users
router.get("/all", UserController.getAllUser);

//route loggin
router.post('/login', UserController.loggin);

//route recherche user par le nom
router.get("/pseudo", UserController.getUserByName);

//route recherche user par leur email
router.get("/email", UserController.getUserByEmail);

//route donner user par Id
router.get("/:id([0-9]+)", UserController.getUserbyId);

//route pour modifié users
router.put("/:id([0-9]+)", UserController.updateUsers);

//supprimer un user par son Id
router.delete("/:id([0-9]+)", UserController.deleteUser);

module.exports = router;
