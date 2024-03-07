const express = require("express");

const routerUser = express.Router();

const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware")

routerUser.get("/users", userController.getAllUsers);

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
)

module.exports = routerUser;