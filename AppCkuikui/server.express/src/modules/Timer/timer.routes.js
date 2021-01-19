const express = require("express");
const TimerController = require("./timer.controller");

const router = express.Router();

//create timer

router.post("/create", TimerController.createTimerbyUserId);

router.get("/all", TimerController.getallTimer);

router.get('/:id([0-9]+)', TimerController.getTimerByUserId);

// router.get('/',TimerController.getAllTimer)


module.exports = router;
