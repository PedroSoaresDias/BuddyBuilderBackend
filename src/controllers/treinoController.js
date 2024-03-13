const treinoModel = require("../models/treinoModel");

const getAllTreinos = async (_req, res) => {
    try {
        const treino = await treinoModel.getAllTreinos();
        return res.status(200).json(treino);
    } catch (err) {
        console.error("Erro ao carregar os treinos no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar os treinos no banco de dados." });
    }
}

const getTreinoById = async (req, res) => {
    try {
        const { id } = req.params;
        const treinoById = await treinoModel.getTreinoById(id);
        if (!treinoById) return res.status(404).json({ message: "Treino não encontrado." });
        return res.status(200).json(treinoById);
    } catch (err) {
        console.error("Erro ao carregar o treino específico no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar o treino específico no banco de dados." });
    }
}

const addTreino = async (req, res) => {
    try {
        const addTreino = await treinoModel.addTreino(req.body);
        return res.status(201).json(addTreino);
    } catch (err) {
        console.error("Erro ao adicionar um novo treino ao banco de dados.", err);
        return res.status(500).json({ error: "Erro ao adicionar um novo treino ao banco de dados." });
    }
}

module.exports = {
    getAllTreinos,
    getTreinoById,
    addTreino
}