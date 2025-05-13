const {
  getAllAddressByUIDService,
  getSingleAddressByIDService,
  updateAddressByIDService,
  addAddressByUIDService,
  deleteAddressByIDService,
} = require("../services/address.service.js");

async function getAllAddressByUID(req, res) {
  try {
    const { uid } = req.params;
    const { limit = 5, page = 1 } = req.query;

    const addresses = await getAllAddressByUIDService(uid, parseInt(limit), parseInt(page));
    res.send({ data: addresses, error: null });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
}

async function getSingleAddressByID(req, res) {
  try {
    const { id } = req.params;
    const address = await getSingleAddressByIDService(id);
    res.send({ data: address, error: null });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
}

async function updateAddressByID(req, res) {
  try {
    const { id } = req.params;
    const updated = await updateAddressByIDService(id, req.body);
    res.send({ data: updated, error: null });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
}

async function addAddressByUID(req, res) {
  try {
    const address = await addAddressByUIDService(req.body);
    res.send({ data: address, error: null });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
}

async function deleteAddressByID(req, res) {
  try {
    const { id } = req.params;
    await deleteAddressByIDService(id);
    res.send({ data: null, error: null, message: "Address deleted successfully!" });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
}

module.exports = {
  getAllAddressByUID,
  getSingleAddressByID,
  updateAddressByID,
  addAddressByUID,
  deleteAddressByID,
};
