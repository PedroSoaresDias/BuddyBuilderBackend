import { Request, Response, NextFunction } from "express";

export const validateFieldEmail = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório.' });
    }

    if (body.email === '') {
        return res.status(400).json({ message: 'O email não pode ser vazio.' });
    }

    next();
}

export const validateFieldNickname = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.apelido === undefined) {
        return res.status(400).json({ message: 'O campo "apelido" é obrigatório.' });
    }

    if (body.apelido === '') {
        return res.status(400).json({ message: 'O apelido não pode ser vazio.' });
    }

    next();
}

export const validateFieldPassword = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.senha === undefined) {
        return res.status(400).json({ message: 'O campo "senha" é obrigatório.' });
    }

    if (body.senha === '') {
        return res.status(400).json({ message: 'A senha não pode ser vazia.' });
    }

    next();
}

export const validateFieldIdUser = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.idUser === undefined) {
        return res.status(400).json({ message: 'O campo "id do usuário" é obrigatório.' });
    }

    if (body.idUser === 0) {
        return res.status(400).json({ message: 'O Id do usuário não pode ser 0.' });
    }

    next();
}

export const validateFieldIdTreino = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.idTreino === undefined) {
        return res.status(400).json({ message: 'O campo "id do treino" é obrigatório.' });
    }

    if (body.idTreino === 0) {
        return res.status(400).json({ message: 'O Id do treino não pode ser 0.' });
    }

    next();
}