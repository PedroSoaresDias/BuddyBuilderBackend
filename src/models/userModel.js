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
exports.deleteUserModel = exports.updateUserModel = exports.addUserModel = exports.getUserByIdModel = exports.getAllUsersModel = void 0;
const connection_1 = require("./connection");
const getAllUsersModel = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT
            u.id,
            u.apelido,
            u.email,
            t.id AS treino_id,
            t.nome_treino AS treino_nome,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_usuario u
        INNER JOIN
            tb_usuario_treino ut ON u.id = ut.id_usuario
        INNER JOIN
            tb_treino t ON ut.id_treino = t.id
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        ORDER BY
            u.apelido ASC
    `;
    const user = yield connection_1.pool.query(query);
    return user.rows;
});
exports.getAllUsersModel = getAllUsersModel;
const getUserByIdModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT
            u.id,
            u.apelido,
            u.email,
            t.id AS treino_id,
            t.nome_treino AS treino_nome,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_usuario u
        INNER JOIN
            tb_usuario_treino ut ON u.id = ut.id_usuario
        INNER JOIN
            tb_treino t ON ut.id_treino = t.id
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        WHERE
            u.id = $1
        ORDER BY
            u.apelido ASC
    `;
    const user = yield connection_1.pool.query(query, [id]);
    return user.rows[0];
});
exports.getUserByIdModel = getUserByIdModel;
const addUserModel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, apelido, senha } = user;
    const query = "INSERT INTO tb_usuario(email, apelido, senha) VALUES($1, $2, $3)";
    const values = [email, apelido, senha];
    const addUser = yield connection_1.pool.query(query, values);
    return addUser;
});
exports.addUserModel = addUserModel;
const updateUserModel = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, apelido, senha } = user;
    const query = "UPDATE tb_usuario SET email = $1, apelido = $2, senha = $3 WHERE id = $4";
    const values = [email, apelido, senha, id];
    const updateUser = yield connection_1.pool.query(query, values);
    return updateUser;
});
exports.updateUserModel = updateUserModel;
const deleteUserModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_usuario WHERE id = $1";
    const removeUser = yield connection_1.pool.query(query, [id]);
    return removeUser;
});
exports.deleteUserModel = deleteUserModel;
