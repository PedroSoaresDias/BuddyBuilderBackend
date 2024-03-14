import express from "express";

import {getAllUsers, getUserById, addUser, updateUser, deleteUser} from "../controllers/userController";
import { validateFieldEmail, validateFieldNickname, validateFieldPassword } from "../middlewares/userMiddleware";

export const routerUser = express.Router();

routerUser.get("/users", getAllUsers);
routerUser.get("/users/:id", getUserById);
routerUser.post("/users", validateFieldEmail, validateFieldNickname, validateFieldPassword, addUser);
routerUser.put("/users/:id", validateFieldEmail, validateFieldNickname, validateFieldPassword, updateUser );
routerUser.delete("/users/:id", deleteUser);