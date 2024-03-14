import express from "express";

import { getAllTreinos, getTreinoById, addTreino, updateTreino, deleteTreino } from "../controllers/treinoController";
import { validateFieldTreino } from "../middlewares/treinoMiddleware";

export const routerTreino = express.Router();

routerTreino.get("/treino", getAllTreinos);
routerTreino.get("/treino/:id", getTreinoById);
routerTreino.post("/treino", validateFieldTreino, addTreino);
routerTreino.put("/treino/:id", validateFieldTreino, updateTreino);
routerTreino.delete("/treino/:id", deleteTreino);