import { Request, Response, NextFunction } from "express";

export const validateFieldExercicio = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (body.nomeExercicio === undefined) {
        return res.status(400).json({ message: 'Campo "nome exercício" é obrigatório.' });
    }

    if (body.nomeExercicio === "") {
        return res.status(400).json({ message: 'O "nome exercício" não pode ser vazio.' });
    }

    next();
}