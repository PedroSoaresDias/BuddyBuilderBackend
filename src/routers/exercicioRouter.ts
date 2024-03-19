import express from "express";

import {
    getAllExercicios,
    getExercicioById,
    addExercicio,
    updateExercicio,
    deleteExercicio
} from "../controllers/exercicioController";
import { validateFieldExercicio, validateFieldIdTreino } from "../middlewares/exercicioMiddleware";

export const routerExercicio = express.Router();

routerExercicio.get("/exercicio", getAllExercicios);
routerExercicio.get("/exercicio/:id", getExercicioById);
routerExercicio.post("/exercicio", validateFieldExercicio, validateFieldIdTreino, addExercicio);
routerExercicio.put("/exercicio/:id", validateFieldExercicio, validateFieldIdTreino, updateExercicio);
routerExercicio.delete("/exercicio/:id", deleteExercicio);