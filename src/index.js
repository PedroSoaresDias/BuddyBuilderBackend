const express = require("express");
const cors = require("cors");
const router = require("./routers");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (_req, res) => {
    res.send("Criado o backend do BuddyBuilder");
});

app.listen(PORT, () => {
    console.log(`Executando o backend`);
});