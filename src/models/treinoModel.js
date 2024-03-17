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
exports.deleteTreinoModel = exports.updateTreinoModel = exports.addTreinoModel = exports.getTreinoByIdModel = exports.getAllTreinosModel = void 0;
const connection_1 = require("./connection");
const getAllTreinosModel = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT
            t.id,
            t.nome_treino,
            e.id AS exercicio_id,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_treino t
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        ORDER BY
            t.nome_treino ASC
    `;
    const treino = yield connection_1.pool.query(query);
    return treino.rows;
});
exports.getAllTreinosModel = getAllTreinosModel;
const getTreinoByIdModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT
            t.id,
            t.nome_treino,
            e.id AS exercicio_id,
            e.nome_exercicio AS exercicio_nome
        FROM
            tb_treino t
        INNER JOIN
            tb_exercicio e ON t.id = e.id_treino
        WHERE
            t.id = $1
        ORDER BY
            t.nome_treino ASC
    `;
    const treino = yield connection_1.pool.query(query, [id]);
    return treino.rows[0];
});
exports.getTreinoByIdModel = getTreinoByIdModel;
const addTreinoModel = (treino) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTreino } = treino;
    const query = "INSERT INTO tb_treino(nome_treino) VALUES($1)";
    const addTreino = yield connection_1.pool.query(query, [nomeTreino]);
    return addTreino;
});
exports.addTreinoModel = addTreinoModel;
const updateTreinoModel = (id, treino) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTreino } = treino;
    const query = "UPDATE tb_treino SET nome_treino = $1 WHERE id = $2";
    const values = [nomeTreino, id];
    const updateTreino = yield connection_1.pool.query(query, values);
    return updateTreino;
});
exports.updateTreinoModel = updateTreinoModel;
const deleteTreinoModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_treino WHERE id = $1";
    const deleteTreino = yield connection_1.pool.query(query, [id]);
    return deleteTreino;
});
exports.deleteTreinoModel = deleteTreinoModel;
