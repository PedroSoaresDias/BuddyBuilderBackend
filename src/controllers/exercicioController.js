const exercicioModel = require("../models/exercicioModel");

const getAllExercicios = async (_req, res) => {
    try {
        const exercicio = await exercicioModel.getAllExercicios();
        res.status(200).json(exercicio);
    } catch (err) {
        console.error("Erro ao carregar os exercícios no banco de dados.", err);
        res.status(500).json({ error: "Erro ao carregar os exercícios no banco de dados" });
    }
}

const addExercicio = async (req, res) => {
    try {
        const addExercicio = await exercicioModel.addExercicio(req.body);
        res.status(201).json(addExercicio)
    } catch (err) {
        console.error("Erro ao adicionar o exercício no banco de dados.", err);
        res.status(500).json({ error: "Erro ao adicionar o exercício no banco de dados." });
    }
}

const updateExercicio = async (req, res) => {
    try {
        const { id } = req.params;
        await exercicioModel.updateExercicio(id, req.body);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao atualizar o exercicio no banco de dados.", err);
        res.status(500).json({error: "Erro ao atualizar o exercicio no banco de dados."})
    }
}

module.exports = {
    getAllExercicios,
    addExercicio,
    updateExercicio
}