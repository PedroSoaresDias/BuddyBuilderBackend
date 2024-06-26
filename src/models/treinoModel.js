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
const queries_1 = require("./queries");
const getAllTreinosModel = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const query = `
        ${queries_1.treinoBaseQuery}
        ORDER BY t.id ASC
        LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];
    const treino = yield connection_1.pool.query(query, values);
    return treino.rows;
});
exports.getAllTreinosModel = getAllTreinosModel;
const getTreinoByIdModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        ${queries_1.treinoBaseQuery}
        WHERE t.id = $1
        ORDER BY t.id ASC
    `;
    const treino = yield connection_1.pool.query(query, [id]);
    return treino.rows[0];
});
exports.getTreinoByIdModel = getTreinoByIdModel;
const addTreinoModel = (nomeTreino, exercicios) => __awaiter(void 0, void 0, void 0, function* () {
    const treinoQuery = "INSERT INTO tb_treino(nome_treino) VALUES($1) RETURNING id";
    const resultadoTreino = yield connection_1.pool.query(treinoQuery, [nomeTreino]);
    const treinoId = resultadoTreino.rows[0].id;
    const exercicioQuery = "INSERT INTO tb_exercicio(nome_exercicio, id_treino) VALUES($1, $2)";
    for (let exercicio of exercicios) {
        yield connection_1.pool.query(exercicioQuery, [exercicio.nomeExercicio, treinoId]);
    }
    return { id: treinoId };
});
exports.addTreinoModel = addTreinoModel;
const updateTreinoModel = (id, treino) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTreino } = treino;
    const query = "UPDATE tb_treino SET nome_treino = $1 WHERE id = $2";
    const values = [nomeTreino, id];
    const updateTreino = yield connection_1.pool.query(query, values);
    return updateTreino.rows[0];
});
exports.updateTreinoModel = updateTreinoModel;
const deleteTreinoModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_treino WHERE id = $1";
    const deleteTreino = yield connection_1.pool.query(query, [id]);
    return deleteTreino.rows[0];
});
exports.deleteTreinoModel = deleteTreinoModel;
