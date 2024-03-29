import { Request, Response } from "express";
import { getAllUsersModel, getUserByIdModel, addUserModel, addUserTreinoModel, updateUserModel, deleteUserModel } from "../models/userModel";

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsersModel();
        const userWithTreinos = users.map((user) => user.usuario_com_treinos);
        return res.status(200).json(userWithTreinos);
    } catch (err) {
        console.error("Erro ao obter os dados do usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao obter os dados do usuário no banco de dados." });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userById = await getUserByIdModel(parseInt(id));

        if (!userById) return res.status(404).json({ message: "Usuário não encontrado" });

        const userWithTreinos = userById.usuario_com_treinos;

        return res.status(200).json(userWithTreinos);
    } catch (err) {
        console.error("Erro ao obter os dados do usuário especifico: ", err);
        return res.status(500).json({ error: "Erro ao obter os dados do usuário especifico." });
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const addUser = await addUserModel(req.body);
        return res.status(201).json(addUser);
    } catch (err) {
        console.error("Erro ao adicionar o usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao adicionar o usuário no banco de dados." });
    }
}

export const addUserTreino = async (req: Request, res: Response) => {
    try {
        const { idUser, idTreino } = req.params;
        const result = await addUserTreinoModel(parseInt(idUser), parseInt(idTreino));
        return res.status(201).json(result)
    } catch (err) {
        console.error("Erro ao conectar o usuário com treino no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao conectar o usuário com treino no banco de dados." });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userById = await getUserByIdModel(parseInt(id));

        if (!userById) return res.status(404).json({ message: "Usuário não encontrado" });

        await updateUserModel(parseInt(id), req.body);
        return res.status(204).json()
    } catch (err) {
        console.error("Erro ao atualizar os dados do usuário no banco de dados: ", err);
        return res.status(500).json({error: "Erro ao atualizar os dados do usuário no banco de dados."})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userById = await getUserByIdModel(parseInt(id));

        if (!userById) return res.status(404).json({ message: "Usuário não encontrado" });

        await deleteUserModel(parseInt(id));
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao excluir o usuário do banco de dados: ", err);
        return res.status(500).json({error: "Erro ao excluir o usuário do banco de dados."})
    }
}