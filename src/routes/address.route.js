import { Router } from "express";
import { addAddressByUID, getAllAddressByUID, getSingleAddressByID } from "../controllers/address.controller.js";

export const AddressRouter = Router();

AddressRouter.get("/all/:uid", getAllAddressByUID);
AddressRouter.get("/:id", getSingleAddressByID);
AddressRouter.post("/", addAddressByUID);