const express = require("express");
const cors = require("cors");
const routerUser = require("./routers/userRouter");
const routerExercicio = require("./routers/exercicioRouter");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerUser);
app.use(routerExercicio);

app.get("/", (_req, res) => {
    res.send("Criado o backend do BuddyBuilder");
});

app.listen(PORT, () => {
    console.log(`Executando o backend`);
})