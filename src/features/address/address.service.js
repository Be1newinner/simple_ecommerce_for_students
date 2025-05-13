const { Types } = require("mongoose");
const { AddressModel } = require("../models/address.models.js");
const { UserModel } = require("../models/users.model.js");

async function getAllAddressByUIDService(uid, limit = 5, page = 1) {
  if (!Types.ObjectId.isValid(uid)) throw new Error("Invalid user ID!");

  const addressData = await AddressModel.find({ uid })
    .limit(limit)
    .skip(Math.max(Math.min(limit, 10) * (page - 1), 0))
    .lean();

  if (!addressData.length) throw new Error("No Address found for this user!");

  return addressData;
}

async function getSingleAddressByIDService(id) {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Address ID!");

  const addressData = await AddressModel.findById(id).lean();
  if (!addressData) throw new Error("No Address found for this id!");

  return addressData;
}

async function updateAddressByIDService(id, payload) {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid Address ID!");

  const addressData = await AddressModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  ).lean();

  if (!addressData) throw new Error("Address not found!");

  return addressData;
}

async function addAddressByUIDService(payload) {
  const { name, phone, address1, address2, city, state, zipcode, uid } = payload;

  if (!name || !phone || !address1 || !address2 || !city || !state || !zipcode || !uid) {
    throw new Error("All required fields are not provided!");
  }

  if (!Types.ObjectId.isValid(uid)) throw new Error("Invalid user ID!");

  const isUserExist = await UserModel.exists({ _id: uid });
  if (!isUserExist) throw new Error("User doesn't exist!");

  const addressData = await AddressModel.create(payload);
  return addressData;
}

async function deleteAddressByIDService(id) {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid address ID!");

  const result = await AddressModel.deleteOne({ _id: id }).exec();

  if (result.deletedCount === 0) throw new Error("Address not deleted!");

  return true;
}

module.exports = {
  getAllAddressByUIDService,
  getSingleAddressByIDService,
  updateAddressByIDService,
  addAddressByUIDService,
  deleteAddressByIDService,
};
