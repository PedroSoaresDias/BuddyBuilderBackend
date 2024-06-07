"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldTreinosFinalizados = exports.validateFieldIMC = exports.validateFieldPeso = exports.validateFieldAltura = exports.validateFieldIdTreino = exports.validateFieldIdUser = exports.validateFieldPassword = exports.validateFieldNickname = exports.validateFieldEmail = void 0;
const validateFieldEmail = (req, res, next) => {
    const { body } = req;
    if (body.email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório.' });
    }
    if (body.email === '') {
        return res.status(400).json({ message: 'O email não pode ser vazio.' });
    }
    next();
};
exports.validateFieldEmail = validateFieldEmail;
const validateFieldNickname = (req, res, next) => {
    const { body } = req;
    if (body.apelido === undefined) {
        return res.status(400).json({ message: 'O campo "apelido" é obrigatório.' });
    }
    if (body.apelido === '') {
        return res.status(400).json({ message: 'O apelido não pode ser vazio.' });
    }
    next();
};
exports.validateFieldNickname = validateFieldNickname;
const validateFieldPassword = (req, res, next) => {
    const { body } = req;
    if (body.senha === undefined) {
        return res.status(400).json({ message: 'O campo "senha" é obrigatório.' });
    }
    if (body.senha === '') {
        return res.status(400).json({ message: 'A senha não pode ser vazia.' });
    }
    next();
};
exports.validateFieldPassword = validateFieldPassword;
const validateFieldIdUser = (req, res, next) => {
    const { body } = req;
    if (body.idUser === undefined) {
        return res.status(400).json({ message: 'O campo "id do usuário" é obrigatório.' });
    }
    if (body.idUser === 0) {
        return res.status(400).json({ message: 'O Id do usuário não pode ser 0.' });
    }
    next();
};
exports.validateFieldIdUser = validateFieldIdUser;
const validateFieldIdTreino = (req, res, next) => {
    const { body } = req;
    if (body.idTreino === undefined) {
        return res.status(400).json({ message: 'O campo "id do treino" é obrigatório.' });
    }
    if (body.idTreino === 0) {
        return res.status(400).json({ message: 'O Id do treino não pode ser 0.' });
    }
    next();
};
exports.validateFieldIdTreino = validateFieldIdTreino;
const validateFieldAltura = (req, res, next) => {
    const { body } = req;
    if (body.altura === undefined) {
        return res.status(400).json({ message: 'O campo "altura" é obrigatório.' });
    }
    if (body.altura === 0) {
        return res.status(400).json({ message: 'A altura não pode ser 0.' });
    }
    next();
};
exports.validateFieldAltura = validateFieldAltura;
const validateFieldPeso = (req, res, next) => {
    const { body } = req;
    if (body.peso === undefined) {
        return res.status(400).json({ message: 'O campo "peso" é obrigatório.' });
    }
    if (body.peso === 0) {
        return res.status(400).json({ message: 'O peso não pode ser 0.' });
    }
    next();
};
exports.validateFieldPeso = validateFieldPeso;
const validateFieldIMC = (req, res, next) => {
    const { body } = req;
    if (body.imc === undefined) {
        return res.status(400).json({ message: 'O campo "imc" é obrigatório.' });
    }
    if (body.imc === 0) {
        return res.status(400).json({ message: 'O imc não pode ser 0.' });
    }
    next();
};
exports.validateFieldIMC = validateFieldIMC;
const validateFieldTreinosFinalizados = (req, res, next) => {
    const { body } = req;
    if (body.treinosFinalizados === undefined) {
        return res.status(400).json({ message: 'O campo "treinos finalizado" é obrigatório.' });
    }
    if (body.treinosFinalizados === 0) {
        return res.status(400).json({ message: 'O número de treinos finalizados atualizados não pode ser igual a 0.' });
    }
    next();
};
exports.validateFieldTreinosFinalizados = validateFieldTreinosFinalizados;
