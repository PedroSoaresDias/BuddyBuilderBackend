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
exports.deleteUserTreinoModel = exports.deleteUserModel = exports.updateUserModel = exports.addUserTreinoModel = exports.findUserByEmailModel = exports.addUserModel = exports.getUserByIdModel = exports.getAllUsersModel = void 0;
const connection_1 = require("./connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const queries_1 = require("./queries");
const getAllUsersModel = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const query = `
        ${queries_1.userBaseQuery}
        ORDER BY u.id ASC
        LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];
    const user = yield connection_1.pool.query(query, values);
    return user.rows;
});
exports.getAllUsersModel = getAllUsersModel;
const getUserByIdModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        ${queries_1.userBaseQuery}
        WHERE u.id = $1
    `;
    const user = yield connection_1.pool.query(query, [id]);
    return user.rows[0];
});
exports.getUserByIdModel = getUserByIdModel;
const addUserModel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, apelido, senha, altura, peso, imc } = user;
    const senhaHashed = yield bcrypt_1.default.hash(senha, 10);
    const query = `
        INSERT INTO tb_usuario
        (email, apelido, senha, created_at, updated_at, altura, peso, imc)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4, $5, $6)
    `;
    const values = [email, apelido, senhaHashed, altura, peso, imc];
    const addUser = yield connection_1.pool.query(query, values);
    return addUser.rows[0];
});
exports.addUserModel = addUserModel;
const findUserByEmailModel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const findUser = yield connection_1.pool.query("SELECT * FROM tb_usuario WHERE email = $1", [email]);
    return findUser.rows[0];
});
exports.findUserByEmailModel = findUserByEmailModel;
const addUserTreinoModel = (idUser, idTreino) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO tb_usuario_treino(id_usuario, id_treino) VALUES($1, $2)";
    const values = [idUser, idTreino];
    const result = yield connection_1.pool.query(query, values);
    return result.rows[0];
});
exports.addUserTreinoModel = addUserTreinoModel;
const updateUserModel = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, apelido, senha, altura, peso, imc } = user;
    const senhaHashed = yield bcrypt_1.default.hash(senha, 10);
    const query = `
        UPDATE tb_usuario SET
        email = $1, apelido = $2, senha = $3, updated_at = CURRENT_TIMESTAMP, altura = $4, peso = $5, imc = $6
        WHERE id = $7
    `;
    const values = [email, apelido, senhaHashed, altura, peso, imc, id];
    const updateUser = yield connection_1.pool.query(query, values);
    return updateUser.rows[0];
});
exports.updateUserModel = updateUserModel;
const deleteUserModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = yield connection_1.pool.query(query, [id]);
    return removeUser.rows[0];
});
exports.deleteUserModel = deleteUserModel;
const deleteUserTreinoModel = (idUser, idTreino) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_usuario_treino WHERE id_usuario = $1 AND id_treino = $2";
    const values = [idUser, idTreino];
    const result = yield connection_1.pool.query(query, values);
    if (result.rowCount === 0)
        throw new Error("Treino não encontrado para o usuário especificado");
    return result.rows[0];
});
exports.deleteUserTreinoModel = deleteUserTreinoModel;
