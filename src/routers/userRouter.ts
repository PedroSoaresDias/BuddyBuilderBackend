import express from "express";

import {getAllUsers, getUserById, addUser, updateUser, deleteUser, addUserTreino} from "../controllers/userController";
import { validateFieldEmail, validateFieldIdTreino, validateFieldIdUser, validateFieldNickname, validateFieldPassword } from "../middlewares/userMiddleware";

export const routerUser = express.Router();

routerUser.get("/users", getAllUsers);
routerUser.get("/users/:id", getUserById);
routerUser.post("/users", validateFieldEmail, validateFieldNickname, validateFieldPassword, addUser);
routerUser.post("/users/:idUser/treinos/:idTreino", validateFieldIdUser, validateFieldIdTreino, addUserTreino)
routerUser.put("/users/:id", validateFieldEmail, validateFieldNickname, validateFieldPassword, updateUser );
routerUser.delete("/users/:id", deleteUser);