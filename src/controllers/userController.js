const userModel = require("../models/userModel")

const getAllUsers = async (_req, res) => {
    try {
        const users = await userModel.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao obter os dados do banco de dados: ", err);
        res.status(500).json({error: "Erro ao obter os dados do banco de dados."})
    }
}

const addUser = async (req, res) => {
    try {
        const addUser = await userModel.addUser(req.body);
        return res.status(201).json(addUser);
    } catch (err) {
        console.error("Erro ao adicionar o usuário no banco de dados: ", err);
        res.status(500).json({error: "Erro ao adicionar o usuário no banco de dados."})
    }
}

module.exports = {
    getAllUsers,
    addUser
}