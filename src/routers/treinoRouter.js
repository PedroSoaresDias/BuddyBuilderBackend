"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTreino = void 0;
const express_1 = __importDefault(require("express"));
const treinoController_1 = require("../controllers/treinoController");
const treinoMiddleware_1 = require("../middlewares/treinoMiddleware");
exports.routerTreino = express_1.default.Router();
exports.routerTreino.get("/treino", treinoController_1.getAllTreinos);
exports.routerTreino.get("/treino/:id", treinoController_1.getTreinoById);
exports.routerTreino.post("/treino", treinoMiddleware_1.validateFieldTreino, treinoController_1.addTreino);
exports.routerTreino.put("/treino/:id", treinoMiddleware_1.validateFieldTreino, treinoController_1.updateTreino);
exports.routerTreino.delete("/treino/:id", treinoController_1.deleteTreino);
