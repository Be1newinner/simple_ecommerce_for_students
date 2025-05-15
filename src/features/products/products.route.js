const { Router } = require("express");
const {
  AddListOfProductsController,
  AddSingleProductController,
  deleteProductByID,
  GetListOfProducts,
  GetSingleProduct,
  UpdateSingleProductController,
} = require("./products.controller.js");

const ProductRouter = Router();

// Public
ProductRouter.route("/").get(GetListOfProducts);
ProductRouter.route("/:sku").get(GetSingleProduct);

// Admin
ProductRouter.route("/").post(AddSingleProductController);
ProductRouter.route("/").patch(UpdateSingleProductController);
ProductRouter.route("/bulk").post(AddListOfProductsController);
ProductRouter.route("/:sku").delete(deleteProductByID);

module.exports = {
  ProductRouter
}