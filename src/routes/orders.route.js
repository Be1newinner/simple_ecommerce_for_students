import { Router } from "express";
import {
    generateOrder,
    getAllOrdersByUID,
    getOrderDetailsByID,
    updateOrderByID
} from "../controllers/orders.controller.js";

export const OrderRouter = Router()

OrderRouter.post("/", generateOrder)
OrderRouter.get("/:id", getOrderDetailsByID)
OrderRouter.get("/all/:uid", getAllOrdersByUID)
OrderRouter.patch("/:id", updateOrderByID)