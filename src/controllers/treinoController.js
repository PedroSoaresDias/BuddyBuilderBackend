const treinoModel = require("../models/treinoModel");

const getAllTreinos = async (_req, res) => {
    try {
        const treino = await treinoModel.getAllTreinos();
        return res.status(200).json(treino);
    } catch (err) {
        console.error("Erro ao carregar os treinos no banco de dados.", err);
        res.status(500).json({ error: "Erro ao carregar os treinos no banco de dados." });
    }
}

module.exports = {
    getAllTreinos
}