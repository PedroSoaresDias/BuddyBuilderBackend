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
exports.deleteExercicio = exports.updateExercicio = exports.addExercicio = exports.getExercicioById = exports.getAllExercicios = void 0;
const exercicioModel_1 = require("../models/exercicioModel");
const getAllExercicios = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercicio = yield (0, exercicioModel_1.getAllExerciciosModel)();
        return res.status(200).json(exercicio);
    }
    catch (err) {
        console.error("Erro ao carregar os exercícios no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar os exercícios no banco de dados." });
    }
});
exports.getAllExercicios = getAllExercicios;
const getExercicioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercicioById = yield (0, exercicioModel_1.getExercicioByIdModel)(parseInt(id));
        if (!exercicioById)
            return res.status(404).json({ message: "Exercício não encontrado" });
        return res.status(200).json(exercicioById);
    }
    catch (err) {
        console.error("Erro ao carregar o exercício especifico no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar o exercício especifico no banco de dados." });
    }
});
exports.getExercicioById = getExercicioById;
const addExercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addExercicio = yield (0, exercicioModel_1.addExercicioModel)(req.body);
        return res.status(201).json(addExercicio);
    }
    catch (err) {
        console.error("Erro ao adicionar o exercício no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao adicionar o exercício no banco de dados." });
    }
});
exports.addExercicio = addExercicio;
const updateExercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercicioById = yield (0, exercicioModel_1.getExercicioByIdModel)(parseInt(id));
        if (!exercicioById)
            return res.status(404).json({ message: "Exercício não encontrado" });
        yield (0, exercicioModel_1.updateExercicioModel)(parseInt(id), req.body);
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao atualizar o exercicio no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao atualizar o exercicio no banco de dados." });
    }
});
exports.updateExercicio = updateExercicio;
const deleteExercicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercicioById = yield (0, exercicioModel_1.getExercicioByIdModel)(parseInt(id));
        if (!exercicioById)
            return res.status(404).json({ message: "Exercício não encontrado" });
        yield (0, exercicioModel_1.deleteExercicioModel)(parseInt(id));
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao excluir o exercicio no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao excluir o exercicio no banco de dados." });
    }
});
exports.deleteExercicio = deleteExercicio;
