const exercicioModel = require("../models/exercicioModel");

const getAllExercicios = async (_req, res) => {
    try {
        const exercicio = await exercicioModel.getAllExercicios();
        res.status(200).json(exercicio);
    } catch (err) {
        console.error("Erro ao carregar os exercícios no banco de dados.", err);
        res.status(500).json({ error: "Erro ao carregar os exercícios no banco de dados." });
    }
}

const getExercicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercicioById = await exercicioModel.getExercicioById(id);

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        return res.status(200).json(exercicioById);        
    } catch (err) {
        console.error("Erro ao carregar o exercício especifico no banco de dados.", err);
        res.status(500).json({ error: "Erro ao carregar o exercício especifico no banco de dados." });
    }
}

const addExercicio = async (req, res) => {
    try {
        const addExercicio = await exercicioModel.addExercicio(req.body);
        res.status(201).json(addExercicio);
    } catch (err) {
        console.error("Erro ao adicionar o exercício no banco de dados.", err);
        res.status(500).json({ error: "Erro ao adicionar o exercício no banco de dados." });
    }
}

const updateExercicio = async (req, res) => {
    try {
        const { id } = req.params;
        const exercicioById = await exercicioModel.getExercicioById(id);

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        await exercicioModel.updateExercicio(id, req.body);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao atualizar o exercicio no banco de dados.", err);
        res.status(500).json({ error: "Erro ao atualizar o exercicio no banco de dados." });
    }
}

const deleteExercicio = async (req, res) => {
    try {
        const { id } = req.params;
        const exercicioById = await exercicioModel.getExercicioById(id);

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        await exercicioModel.deleteExercicio(id);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao excluir o exercicio no banco de dados.", err);
        res.status(500).json({ error: "Erro ao excluir o exercicio no banco de dados." });
    }
}

module.exports = {
    getAllExercicios,
    getExercicioById,
    addExercicio,
    updateExercicio,
    deleteExercicio
}