import express from "express";

import { getAllTreinos, getTreinoById, addTreino, updateTreino, deleteTreino } from "../controllers/treinoController";
import { validateFieldTreino } from "../middlewares/treinoMiddleware";
import { verifyToken } from "../middlewares/authMiddleware";

export const routerTreino = express.Router();

routerTreino.get("/treino", getAllTreinos);
routerTreino.get("/treino/:id", getTreinoById);
routerTreino.post("/treino", verifyToken, validateFieldTreino, addTreino);
routerTreino.put("/treino/:id", verifyToken, validateFieldTreino, updateTreino);
routerTreino.delete("/treino/:id", verifyToken, deleteTreino);