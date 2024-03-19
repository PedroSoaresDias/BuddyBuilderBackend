"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldIdTreino = exports.validateFieldExercicio = void 0;
const validateFieldExercicio = (req, res, next) => {
    const { body } = req;
    if (body.nomeExercicio === undefined) {
        return res.status(400).json({ message: 'Campo "nome exercício" é obrigatório.' });
    }
    if (body.nomeExercicio === "") {
        return res.status(400).json({ message: 'O "nome exercício" não pode ser vazio.' });
    }
    next();
};
exports.validateFieldExercicio = validateFieldExercicio;
const validateFieldIdTreino = (req, res, next) => {
    const { body } = req;
    if (body.idTreino === undefined) {
        return res.status(400).json({ message: 'Campo "Id Treino" é obrigatório.' });
    }
    if (body.idTreino === 0) {
        return res.status(400).json({ message: 'O "Id Treino" não pode ser 0.' });
    }
    next();
};
exports.validateFieldIdTreino = validateFieldIdTreino;
