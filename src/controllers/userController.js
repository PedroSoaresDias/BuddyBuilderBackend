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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserTreino = exports.deleteUser = exports.updateIMC = exports.updateUser = exports.addUserTreino = exports.findUserByEmail = exports.addUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env = process.env;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    try {
        const users = yield (0, userModel_1.getAllUsersModel)(page, limit);
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
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senha } = req.body;
    try {
        const user = yield (0, userModel_1.findUserByEmailModel)(req.body);
        if (!user)
            return res.status(401).json({ error: "E-mail inválido." });
        const senhaEhValida = yield bcrypt_1.default.compareSync(senha, user.senha);
        if (!senhaEhValida)
            return res.status(401).json({ error: "Senha inválida." });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
        res.status(200).json({
            id: user.id,
            message: "Login efetuado com sucesso.",
            token: token
        });
    }
    catch (err) {
        console.error("Erro ao encontrar o usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao encontrar o usuário no banco de dados." });
    }
});
exports.findUserByEmail = findUserByEmail;
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
const updateIMC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { altura, peso, imc } = req.body;
        const userById = yield (0, userModel_1.getUserByIdModel)(parseInt(id));
        if (!userById)
            return res.status(404).json({ message: "Usuário não encontrado" });
        if (!altura || !peso || !imc) {
            return res.status(400).json({ error: "Campos de altura, peso e IMC são necessários" });
        }
        yield (0, userModel_1.updateIMCModel)(parseInt(id), altura, peso, imc);
    }
    catch (err) {
        console.error("Erro ao atualizar o IMC do usuário no banco de dados: ", err);
        return res.status(500).json({ error: "Erro ao atualizar o IMC do usuário no banco de dados." });
    }
});
exports.updateIMC = updateIMC;
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
const deleteUserTreino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, idTreino } = req.params;
        yield (0, userModel_1.deleteUserTreinoModel)(parseInt(idUser), parseInt(idTreino));
        return res.status(204).json();
    }
    catch (err) {
        if (err.message === "Treino não encontrado para o usuário especificado") {
            return res.status(404).json({ error: "Treino não encontrado para o usuário especificado." });
        }
        else {
            console.error("Erro ao remover o treino do usuário no banco de dados: ", err);
            return res.status(500).json({ error: "Erro ao remover o treino do usuário no banco de dados." });
        }
    }
});
exports.deleteUserTreino = deleteUserTreino;
