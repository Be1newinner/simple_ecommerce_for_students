const { Router } = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/users.controller.js");

const AuthRouter = Router();

AuthRouter.post("/login", loginController);
AuthRouter.post("/register", registerController);

module.exports = {
  AuthRouter
}