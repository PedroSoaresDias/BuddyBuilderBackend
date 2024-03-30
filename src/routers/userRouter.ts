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
    validateFieldAltura,
    validateFieldEmail,
    validateFieldIdTreino,
    validateFieldIdUser,
    validateFieldIMC,
    validateFieldNickname,
    validateFieldPassword,
    validateFieldPeso
} from "../middlewares/userMiddleware";

export const routerUser = express.Router();

routerUser.get("/users", getAllUsers);

routerUser.get("/users/:id", getUserById);

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
    validateFieldIdUser,
    validateFieldIdTreino,
    addUserTreino
);

routerUser.put("/users/:id",
    validateFieldEmail,
    validateFieldNickname,
    validateFieldPassword,
    validateFieldAltura,
    validateFieldPeso,
    validateFieldIMC,
    updateUser
);

routerUser.delete("/users/:id", deleteUser);