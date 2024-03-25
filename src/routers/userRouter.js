"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
exports.routerUser = express_1.default.Router();
exports.routerUser.get("/users", userController_1.getAllUsers);
exports.routerUser.get("/users/:id", userController_1.getUserById);
exports.routerUser.post("/users", userMiddleware_1.validateFieldEmail, userMiddleware_1.validateFieldNickname, userMiddleware_1.validateFieldPassword, userMiddleware_1.validateFieldAltura, userMiddleware_1.validateFieldPeso, userMiddleware_1.validateFieldIMC, userController_1.addUser);
exports.routerUser.post("/users/:idUser/treinos/:idTreino", userMiddleware_1.validateFieldIdUser, userMiddleware_1.validateFieldIdTreino, userController_1.addUserTreino);
exports.routerUser.put("/users/:id", userMiddleware_1.validateFieldEmail, userMiddleware_1.validateFieldNickname, userMiddleware_1.validateFieldPassword, userMiddleware_1.validateFieldAltura, userMiddleware_1.validateFieldPeso, userMiddleware_1.validateFieldIMC, userController_1.updateUser);
exports.routerUser.delete("/users/:id", userController_1.deleteUser);
