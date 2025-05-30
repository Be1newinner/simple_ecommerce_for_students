const { Router } = require("express");
const { addAddressByUID, deleteAddressByID, getAllAddressByUID, getSingleAddressByID, updateAddressByID } = require("./address.controller");

const AddressRouter = Router();

AddressRouter.get("/all/:uid", getAllAddressByUID);
AddressRouter.get("/:id", getSingleAddressByID);
AddressRouter.delete("/:id", deleteAddressByID);
AddressRouter.patch("/:id", updateAddressByID);
AddressRouter.post("/", addAddressByUID);

module.exports = {
    AddressRouter
}