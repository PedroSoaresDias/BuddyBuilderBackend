import { Request, Response } from "express";
import { getAllTreinosModel, getTreinoByIdModel, addTreinoModel, updateTreinoModel, deleteTreinoModel } from "../models/treinoModel";

export const getAllTreinos = async (_req: Request, res: Response) => {
    try {
        const treinos = await getAllTreinosModel();
        const treinoComExercicios = treinos.map((treino) => treino.treino_com_exercicios);
        return res.status(200).json(treinoComExercicios);
    } catch (err) {
        console.error("Erro ao carregar os treinos no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar os treinos no banco de dados." });
    }
}

export const getTreinoById = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const treinoById = await getTreinoByIdModel(id);
        if (!treinoById) return res.status(404).json({ message: "Treino não encontrado." });
        return res.status(200).json(treinoById);
    } catch (err) {
        console.error("Erro ao carregar o treino específico no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar o treino específico no banco de dados." });
    }
}

export const addTreino = async (req: Request, res: Response) => {
    try {
        const addTreino = await addTreinoModel(req.body);
        return res.status(201).json(addTreino);
    } catch (err) {
        console.error("Erro ao adicionar um novo treino ao banco de dados.", err);
        return res.status(500).json({ error: "Erro ao adicionar um novo treino ao banco de dados." });
    }
}

export const updateTreino = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const treinoById = await getTreinoByIdModel(id);
        if (!treinoById) return res.status(404).json({ message: "Treino não encontrado." });

        await updateTreinoModel(id, req.body);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao atualizar o treino no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao atualizar o treino no banco de dados." });
    }
}

export const deleteTreino = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const treinoById = await getTreinoByIdModel(id);
        if (!treinoById) return res.status(404).json({ message: "Treino não encontrado." });

        await deleteTreinoModel(id);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao excluir o treino no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao excluir o treino no banco de dados." });
    }
}