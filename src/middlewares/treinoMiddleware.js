"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldTreino = void 0;
const validateFieldTreino = (req, res, next) => {
    const { body } = req;
    if (body.nomeTreino === undefined) {
        return res.status(400).json({ message: 'O campo "nome treino" é obrigatório.' });
    }
    if (body.nomeTreino === "") {
        return res.status(400).json({ message: 'O "nome treino" não pode ser vazio.' });
    }
    next();
};
exports.validateFieldTreino = validateFieldTreino;
