"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routers/userRouter");
const treinoRouter_1 = require("./routers/treinoRouter");
const exercicioRouter_1 = require("./routers/exercicioRouter");
exports.router = express_1.default.Router();
exports.router.use(userRouter_1.routerUser);
exports.router.use(treinoRouter_1.routerTreino);
exports.router.use(exercicioRouter_1.routerExercicio);
