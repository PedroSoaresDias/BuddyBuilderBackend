const express = require("express");

const routerUser = express.Router();

const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware")

routerUser.get("/users", userController.getAllUsers);

routerUser.get("/users/:id", userController.getUserById);

routerUser.post("/users",
    userMiddleware.validateFieldEmail,
    userMiddleware.validateFieldNickname,
    userMiddleware.validateFieldPassword,
    userController.addUser
);

routerUser.put("/users/:id",
    userMiddleware.validateFieldEmail,
    userMiddleware.validateFieldNickname,
    userMiddleware.validateFieldPassword,
    userController.updateUser
);

routerUser.delete("/users/:id", userController.deleteUser);

module.exports = routerUser;