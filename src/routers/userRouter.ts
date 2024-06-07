import express from "express";

import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addUserTreino,
    findUserByEmail,
    deleteUserTreino,
    updateIMC,
    updateTreinosFinalizados
} from "../controllers/userController";

import {
    validateFieldAltura,
    validateFieldEmail,
    validateFieldIdTreino,
    validateFieldIdUser,
    validateFieldIMC,
    validateFieldNickname,
    validateFieldPassword,
    validateFieldPeso,
    validateFieldTreinosFinalizados,
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

routerUser.put("/users/:id/imc",
    verifyToken,
    validateFieldAltura,
    validateFieldPeso,
    validateFieldIMC,
    updateIMC
);

routerUser.put("/users/:id/treinosFinalizados",
    verifyToken,
    validateFieldTreinosFinalizados,
    updateTreinosFinalizados
);

routerUser.delete("/users/:id", verifyToken, deleteUser);

routerUser.delete("/users/:idUser/treinos/:idTreino",
    verifyToken,
    deleteUserTreino
);