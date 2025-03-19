import { Router } from "express";
import {
    generateOrder,
    getAllOrdersByUID,
    getOrderDetailsByID,
    updateOrderByID
} from "../controllers/orders.controller.js";
import VerifyAccessTokenMiddleWare from "../middleware/VerifyAccessToken.js";

export const OrderRouter = Router()

OrderRouter.post("/", VerifyAccessTokenMiddleWare, generateOrder)
OrderRouter.get("/single/:id", VerifyAccessTokenMiddleWare, getOrderDetailsByID)
OrderRouter.get("/all", VerifyAccessTokenMiddleWare, getAllOrdersByUID)
OrderRouter.patch("/:id", VerifyAccessTokenMiddleWare, updateOrderByID)