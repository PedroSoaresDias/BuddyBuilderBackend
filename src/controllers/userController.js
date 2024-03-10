const userModel = require("../models/userModel")

const getAllUsers = async (_req, res) => {
    try {
        const users = await userModel.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao obter os dados do usuário no banco de dados: ", err);
        res.status(500).json({ error: "Erro ao obter os dados do usuário no banco de dados." });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await userModel.getUserById(id);

        if (!userById) return res.status(404).json({ error: "Usuário não encontrado" });

        return res.status(200).json(userById);
    } catch (err) {
        console.error("Erro ao obter os dados do usuário especifico: ", err);
        res.status(500).json({ error: "Erro ao obter os dados do usuário especifico." });
    }
}

const addUser = async (req, res) => {
    try {
        const addUser = await userModel.addUser(req.body);
        return res.status(201).json(addUser);
    } catch (err) {
        console.error("Erro ao adicionar o usuário no banco de dados: ", err);
        res.status(500).json({ error: "Erro ao adicionar o usuário no banco de dados." });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await userModel.getUserById(id);

        if (!userById) return res.status(404).json({ error: "Usuário não encontrado" });

        await userModel.updateUser(id, req.body);
        return res.status(204).json()
    } catch (err) {
        console.error("Erro ao atualizar os dados do usuário no banco de dados: ", err);
        res.status(500).json({error: "Erro ao atualizar os dados do usuário no banco de dados."})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await userModel.getUserById(id);

        if (!userById) return res.status(404).json({ error: "Usuário não encontrado" });

        await userModel.deleteUser(id);
        return res.status(204).json();
    } catch (err) {
        console.error("Erro ao excluir o usuário do banco de dados: ", err);
        res.status(500).json({error: "Erro ao excluir o usuário do banco de dados."})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}