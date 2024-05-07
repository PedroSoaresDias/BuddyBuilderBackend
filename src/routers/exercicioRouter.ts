import express from "express";

import {
    getAllExercicios,
    getExercicioById,
    addExercicio,
    updateExercicio,
    deleteExercicio
} from "../controllers/exercicioController";
import { validateFieldExercicio, validateFieldIdTreino } from "../middlewares/exercicioMiddleware";
import { verifyToken } from "../middlewares/authMiddleware";

export const routerExercicio = express.Router();

routerExercicio.get("/exercicio", verifyToken, getAllExercicios);
routerExercicio.get("/exercicio/:id", verifyToken, getExercicioById);
routerExercicio.post("/exercicio", verifyToken, validateFieldExercicio, validateFieldIdTreino, addExercicio);
routerExercicio.put("/exercicio/:id", verifyToken, validateFieldExercicio, validateFieldIdTreino, updateExercicio);
routerExercicio.delete("/exercicio/:id", verifyToken, deleteExercicio);