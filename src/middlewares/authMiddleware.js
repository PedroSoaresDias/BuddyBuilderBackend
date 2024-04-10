"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env = process.env;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(403).json({ message: "Token não fornecido" });
    jsonwebtoken_1.default.verify(token.split(" ")[1], env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Token inválido" });
        req.body.id = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
