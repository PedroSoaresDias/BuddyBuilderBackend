import express from "express";

import { routerUser } from "./routers/userRouter";
import { routerTreino } from "./routers/treinoRouter";
import { routerExercicio } from "./routers/exercicioRouter";

export const router = express.Router();

router.use(routerUser);
router.use(routerTreino);
router.use(routerExercicio);