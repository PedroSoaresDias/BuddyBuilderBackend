const express = require("express");

const router = express.Router();

const routerUser = require("./routers/userRouter");
const routerTreino = require("./routers/treinoRouter");
const routerExercicio = require("./routers/exercicioRouter");

router.use(routerUser);
router.use(routerTreino);
router.use(routerExercicio);

module.exports = router;