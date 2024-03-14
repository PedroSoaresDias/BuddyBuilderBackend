"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldPassword = exports.validateFieldNickname = exports.validateFieldEmail = void 0;
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
