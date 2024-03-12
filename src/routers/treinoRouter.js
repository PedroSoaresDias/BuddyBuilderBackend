const express = require("express");

const routerTreino = express.Router();

const treinoController = require("../controllers/treinoController");
const treinoMiddleware = require("../middlewares/treinoMiddleware");

routerTreino.get("/treino", treinoController.getAllTreinos);

routerTreino.post("/treino",
    treinoMiddleware.validateFieldTreino,
    treinoController.addTreino
);

module.exports = routerTreino;