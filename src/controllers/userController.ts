import { Request, Response } from "express";
import { getAllUsersModel, getUserByIdModel, addUserModel, addUserTreinoModel, updateUserModel, deleteUserModel, findUserByEmailModel, deleteUserTreinoModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Env = {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
}

const env: Env = process.env as Env;

export const getAllUsers = async (req: Request, res: Response) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    try {
        const users = await getAllUsersModel(page as number, limit as number);
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

export const findUserByEmail = async (req: Request, res: Response) => {
    const { senha } = req.body;
    
    try {
        const user = await findUserByEmailModel(req.body);
        if (!user) {
            return res.status(401).json({ error: "E-mail inválido." });
        }

        const senhaEhValida = await bcrypt.compareSync(senha, user.senha);

        if (!senhaEhValida) {
            return res.status(401).json({ error: "Senha inválida." });
        }

        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });

        res.status(200).send({
            userId: user.id,
            message: "Login efetuado com sucesso.",
            token: token
        });
    } catch (err) {
        console.error("Erro ao encontrar o usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao encontrar o usuário no banco de dados." });
    }
}

export const addUserTreino = async (req: Request, res: Response) => {
    try {
        const { idUser, idTreino } = req.params;
        const result = await addUserTreinoModel(parseInt(idUser), parseInt(idTreino));
        return res.status(201).json(result);
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

export const deleteUserTreino = async (req: Request, res: Response) => {
    try {
        const { idUser, idTreino } = req.params;
        await deleteUserTreinoModel(parseInt(idUser), parseInt(idTreino));
        return res.status(204).json();
    } catch (err: any) {
        if (err.message === "Treino não encontrado para o usuário especificado") {
            return res.status(404).json({ error: "Treino não encontrado para o usuário especificado." });
        } else {
            console.error("Erro ao remover o treino do usuário no banco de dados: ", err);
            return res.status(500).json({ error: "Erro ao remover o treino do usuário no banco de dados." });
        }
    }
}