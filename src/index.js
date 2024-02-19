const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.send("Criado o backend do BuddyBuilder");
});

app.listen(3000, () => {
    console.log(`Executando o backend`)
})