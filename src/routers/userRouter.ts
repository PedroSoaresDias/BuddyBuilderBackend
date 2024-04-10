import express from "express";

import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addUserTreino,
    findUserByEmail
} from "../controllers/userController";

import {
    validateFieldEmail,
    validateFieldIdTreino,
    validateFieldIdUser,
    validateFieldNickname,
    validateFieldPassword,
} from "../middlewares/userMiddleware";

import { verifyToken } from "../middlewares/authMiddleware";

export const routerUser = express.Router();

routerUser.get("/users", verifyToken, getAllUsers);

routerUser.get("/users/:id", verifyToken, getUserById);

routerUser.post("/users/register",
    validateFieldEmail,
    validateFieldNickname,
    validateFieldPassword,
    addUser
);

routerUser.post("/users/login",
    validateFieldEmail,
    validateFieldPassword,
    findUserByEmail
);

routerUser.post("/users/:idUser/treinos/:idTreino",
    verifyToken,
    validateFieldIdUser,
    validateFieldIdTreino,
    addUserTreino
);

routerUser.put("/users/:id",
    verifyToken,
    validateFieldEmail,
    validateFieldNickname,
    validateFieldPassword,
    updateUser
);

routerUser.delete("/users/:id", verifyToken, deleteUser);