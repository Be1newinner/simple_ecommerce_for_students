import { Router } from "express";
import {
  getCartController,
  increaseItemQuanityInCartController,
} from "../controllers/carts.controller.js";
import VerifyAccessTokenMiddleWare from "../middleware/VerifyAccessToken.js";

export const CartRouter = Router();

CartRouter.get("/:uid", VerifyAccessTokenMiddleWare, getCartController);
CartRouter.patch("/", VerifyAccessTokenMiddleWare, increaseItemQuanityInCartController);
