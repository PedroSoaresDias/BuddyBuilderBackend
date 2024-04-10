import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type Env = {
    JWT_SECRET: string;
}

const env: Env = process.env as Env;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: "Token não fornecido" });

    jwt.verify(token.split(" ")[1], env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido" });

        req.body.id = (decoded as any).id;
        next();
    })
}