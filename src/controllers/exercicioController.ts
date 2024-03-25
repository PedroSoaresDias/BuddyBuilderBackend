import { Request, Response } from "express";

import {
    getAllExerciciosModel,
    getExercicioByIdModel,
    addExercicioModel,
    updateExercicioModel,
    deleteExercicioModel
} from "../models/exercicioModel";

export const getAllExercicios = async (_req: Request, res: Response) => {
    try {
        const exercicio = await getAllExerciciosModel();
        return res.status(200).json(exercicio);
    } catch (err) {
        console.error("Erro ao carregar os exercícios no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar os exercícios no banco de dados." });
    }
}

export const getExercicioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const exercicioById = await getExercicioByIdModel(parseInt(id));

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        return res.status(200).json(exercicioById);        
    } catch (err) {
        console.error("Erro ao carregar o exercício especifico no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar o exercício especifico no banco de dados." });
    }
}

export const addExercicio = async (req: Request, res: Response) => {
    try {
        const addExercicio = await addExercicioModel(req.body);
        return res.status(201).json(addExercicio);
    } catch (err) {
        console.error("Erro ao adicionar o exercício no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao adicionar o exercício no banco de dados." });
    }
}

export const updateExercicio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const exercicioById = await getExercicioByIdModel(parseInt(id));

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        await updateExercicioModel(parseInt(id), req.body);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao atualizar o exercicio no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao atualizar o exercicio no banco de dados." });
    }
}

export const deleteExercicio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const exercicioById = await getExercicioByIdModel(parseInt(id));

        if (!exercicioById) return res.status(404).json({ message: "Exercício não encontrado" });

        await deleteExercicioModel(parseInt(id));
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao excluir o exercicio no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao excluir o exercicio no banco de dados." });
    }
}