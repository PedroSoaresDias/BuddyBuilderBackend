const express = require("express");

const routerTreino = express.Router();

const treinoController = require("../controllers/treinoController");
const treinoMiddleware = require("../middlewares/treinoMiddleware");

routerTreino.get("/treino", treinoController.getAllTreinos);

routerTreino.get("/treino/:id", treinoController.getTreinoById);

routerTreino.post("/treino",
    treinoMiddleware.validateFieldTreino,
    treinoController.addTreino
);

routerTreino.put("/treino/:id",
    treinoMiddleware.validateFieldTreino,
    treinoController.updateTreino
);

module.exports = routerTreino;