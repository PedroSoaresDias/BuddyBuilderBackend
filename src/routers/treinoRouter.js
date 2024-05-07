"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTreino = void 0;
const express_1 = __importDefault(require("express"));
const treinoController_1 = require("../controllers/treinoController");
const treinoMiddleware_1 = require("../middlewares/treinoMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.routerTreino = express_1.default.Router();
exports.routerTreino.get("/treino", authMiddleware_1.verifyToken, treinoController_1.getAllTreinos);
exports.routerTreino.get("/treino/:id", authMiddleware_1.verifyToken, treinoController_1.getTreinoById);
exports.routerTreino.post("/treino", authMiddleware_1.verifyToken, treinoMiddleware_1.validateFieldTreino, treinoController_1.addTreino);
exports.routerTreino.put("/treino/:id", authMiddleware_1.verifyToken, treinoMiddleware_1.validateFieldTreino, treinoController_1.updateTreino);
exports.routerTreino.delete("/treino/:id", authMiddleware_1.verifyToken, treinoController_1.deleteTreino);
