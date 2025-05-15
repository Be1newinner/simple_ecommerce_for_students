const {
  increaseItemQuantityService,
  getCartService
} = require("./carts.service.js");

async function increaseItemQuanityInCartController(req, res) {
  try {
    const { product_id, action = "INCREASE" } = req.body;
    const { uid } = req.locals;

    if (!product_id || !uid || !action)
      return res.send({
        error: "All keys are required: product_id, uid, action!",
        data: null
      });

    const result = await increaseItemQuantityService({ uid, product_id, action });

    return res.send({
      data: result.data,
      error: null,
      message: result.message
    });

  } catch (error) {
    return res.status(500).json({ message: error.message, data: null });
  }
}

async function getCartController(req, res) {
  try {
    const { uid } = req.locals;
    const data = await getCartService(uid);

    return res.status(200).json({
      message: "Products Fetched Successfully!",
      data
    });

  } catch (error) {
    return res.status(500).json({ message: error.message, data: null });
  }
}

module.exports = {
  increaseItemQuanityInCartController,
  getCartController
};
