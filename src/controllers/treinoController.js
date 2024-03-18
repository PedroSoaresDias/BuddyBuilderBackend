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
exports.deleteTreino = exports.updateTreino = exports.addTreino = exports.getTreinoById = exports.getAllTreinos = void 0;
const treinoModel_1 = require("../models/treinoModel");
const getAllTreinos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const treinos = yield (0, treinoModel_1.getAllTreinosModel)();
        const treinoComExercicios = treinos.map((treino) => treino.treino_com_exercicios);
        return res.status(200).json(treinoComExercicios);
    }
    catch (err) {
        console.error("Erro ao carregar os treinos no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar os treinos no banco de dados." });
    }
});
exports.getAllTreinos = getAllTreinos;
const getTreinoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const treinoById = yield (0, treinoModel_1.getTreinoByIdModel)(id);
        if (!treinoById)
            return res.status(404).json({ message: "Treino não encontrado." });
        const treinoByIdComExercicios = treinoById.treino_com_exercicios;
        return res.status(200).json(treinoByIdComExercicios);
    }
    catch (err) {
        console.error("Erro ao carregar o treino específico no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao carregar o treino específico no banco de dados." });
    }
});
exports.getTreinoById = getTreinoById;
const addTreino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addTreino = yield (0, treinoModel_1.addTreinoModel)(req.body);
        return res.status(201).json(addTreino);
    }
    catch (err) {
        console.error("Erro ao adicionar um novo treino ao banco de dados.", err);
        return res.status(500).json({ error: "Erro ao adicionar um novo treino ao banco de dados." });
    }
});
exports.addTreino = addTreino;
const updateTreino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const treinoById = yield (0, treinoModel_1.getTreinoByIdModel)(id);
        if (!treinoById)
            return res.status(404).json({ message: "Treino não encontrado." });
        yield (0, treinoModel_1.updateTreinoModel)(id, req.body);
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao atualizar o treino no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao atualizar o treino no banco de dados." });
    }
});
exports.updateTreino = updateTreino;
const deleteTreino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const treinoById = yield (0, treinoModel_1.getTreinoByIdModel)(id);
        if (!treinoById)
            return res.status(404).json({ message: "Treino não encontrado." });
        yield (0, treinoModel_1.deleteTreinoModel)(id);
        return res.status(204).json();
    }
    catch (err) {
        console.error("Erro ao excluir o treino no banco de dados.", err);
        return res.status(500).json({ error: "Erro ao excluir o treino no banco de dados." });
    }
});
exports.deleteTreino = deleteTreino;
