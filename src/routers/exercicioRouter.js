"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerExercicio = void 0;
const express_1 = __importDefault(require("express"));
const exercicioController_1 = require("../controllers/exercicioController");
const exercicioMiddleware_1 = require("../middlewares/exercicioMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.routerExercicio = express_1.default.Router();
exports.routerExercicio.get("/exercicio", exercicioController_1.getAllExercicios);
exports.routerExercicio.get("/exercicio/:id", exercicioController_1.getExercicioById);
exports.routerExercicio.post("/exercicio", authMiddleware_1.verifyToken, exercicioMiddleware_1.validateFieldExercicio, exercicioMiddleware_1.validateFieldIdTreino, exercicioController_1.addExercicio);
exports.routerExercicio.put("/exercicio/:id", authMiddleware_1.verifyToken, exercicioMiddleware_1.validateFieldExercicio, exercicioMiddleware_1.validateFieldIdTreino, exercicioController_1.updateExercicio);
exports.routerExercicio.delete("/exercicio/:id", authMiddleware_1.verifyToken, exercicioController_1.deleteExercicio);
