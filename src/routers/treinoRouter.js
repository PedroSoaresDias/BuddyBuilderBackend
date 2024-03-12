const express = require("express");

const routerTreino = express.Router();

const treinoController = require("../controllers/treinoController");

routerTreino.get("/treino", treinoController.getAllTreinos);

module.exports = routerTreino;