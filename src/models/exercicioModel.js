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
exports.deleteExercicioModel = exports.updateExercicioModel = exports.addExercicioModel = exports.getExercicioByIdModel = exports.getAllExerciciosModel = void 0;
const connection_1 = require("./connection");
const getAllExerciciosModel = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const exercicio = yield connection_1.pool.query("SELECT * FROM tb_exercicio LIMIT $1 OFFSET $2", [limit, offset]);
    return exercicio.rows;
});
exports.getAllExerciciosModel = getAllExerciciosModel;
const getExercicioByIdModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exercicioById = yield connection_1.pool.query("SELECT * FROM tb_exercicio WHERE id = $1", [id]);
    return exercicioById.rows[0];
});
exports.getExercicioByIdModel = getExercicioByIdModel;
const addExercicioModel = (exercicio) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeExercicio, idTreino } = exercicio;
    const query = "INSERT INTO tb_exercicio(nome_exercicio, id_treino) VALUES($1, $2)";
    const values = [nomeExercicio, idTreino];
    const addExercicio = yield connection_1.pool.query(query, values);
    return addExercicio.rows[0];
});
exports.addExercicioModel = addExercicioModel;
const updateExercicioModel = (id, exercicio) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeExercicio } = exercicio;
    const query = "UPDATE tb_exercicio SET nome_exercicio = $1 WHERE id = $2";
    const values = [nomeExercicio, id];
    const updateExercicio = yield connection_1.pool.query(query, values);
    return updateExercicio;
});
exports.updateExercicioModel = updateExercicioModel;
const deleteExercicioModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tb_exercicio WHERE id = $1";
    const deleteExercicio = connection_1.pool.query(query, [id]);
    return deleteExercicio;
});
exports.deleteExercicioModel = deleteExercicioModel;
