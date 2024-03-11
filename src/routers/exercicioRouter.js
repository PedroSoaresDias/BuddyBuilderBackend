const express = require("express");

const routerExercicio = express.Router();

const exercicioController = require("../controllers/exercicioController");
const exercicioMiddleware = require("../middlewares/exercicioMiddleware");

routerExercicio.get("/exercicio", exercicioController.getAllExercicios);

routerExercicio.post("/exercicio",
    exercicioMiddleware.validateFieldExercicio,
    exercicioController.addExercicio
);

routerExercicio.put("/exercicio/:id",
    exercicioMiddleware.validateFieldExercicio,
    exercicioController.updateExercicio
)

module.exports = routerExercicio;