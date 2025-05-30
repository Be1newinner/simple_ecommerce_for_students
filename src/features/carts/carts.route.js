const { Router } = require("express");
const {
  getCartController,
  increaseItemQuanityInCartController,
} = require("./carts.controller.js");

const { VerifyAccessTokenMiddleWare } = require("../../shared/middleware/VerifyAccessToken.js");

const CartRouter = Router();

CartRouter.get("/:uid", VerifyAccessTokenMiddleWare, getCartController);
CartRouter.patch("/", VerifyAccessTokenMiddleWare, increaseItemQuanityInCartController);

module.exports = {
  CartRouter
}
