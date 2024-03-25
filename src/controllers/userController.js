"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUserTreino = exports.addUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.getAllUsersModel)();
        const userWithTreinos = users.map((user) => user.usuario_com_treinos);
        return res.status(200).json(userWithTreinos);
    }
    catch (err) {
        console.error("Erro ao obter os dados do usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao obter os dados do usuário no banco de dados." });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userById = yield (0, userModel_1.getUserByIdModel)(parseInt(id));
        if (!userById)
            return res.status(404).json({ message: "Usuário não encontrado" });
        const userWithTreinos = userById.usuario_com_treinos;
        return res.status(200).json(userWithTreinos);
    }
    catch (err) {
        console.error("Erro ao obter os dados do usuário especifico: ", err);
        return res.status(500).json({ error: "Erro ao obter os dados do usuário especifico." });
    }
});
exports.getUserById = getUserById;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addUser = yield (0, userModel_1.addUserModel)(req.body);
        return res.status(201).json(addUser);
    }
    catch (err) {
        console.error("Erro ao adicionar o usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao adicionar o usuário no banco de dados." });
    }
});
exports.addUser = addUser;
const addUserTreino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, idTreino } = req.params;
        const result = yield (0, userModel_1.addUserTreinoModel)(parseInt(idUser), parseInt(idTreino));
        return res.status(201).json(result);
    }
    catch (err) {
        console.error("Erro ao conectar o usuário com treino no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao conectar o usuário com treino no banco de dados." });
    }
});
exports.addUserTreino = addUserTreino;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userById = yield (0, userModel_1.getUserByIdModel)(parseInt(id));
        if (!userById)
            return res.status(404).json({ message: "Usuário não encontrado" });
        yield (0, userModel_1.updateUserModel)(parseInt(id), req.body);
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao atualizar os dados do usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao atualizar os dados do usuário no banco de dados." });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userById = yield (0, userModel_1.getUserByIdModel)(parseInt(id));
        if (!userById)
            return res.status(404).json({ message: "Usuário não encontrado" });
        yield (0, userModel_1.deleteUserModel)(parseInt(id));
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao excluir o usuário do banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao excluir o usuário do banco de dados." });
    }
});
exports.deleteUser = deleteUser;
