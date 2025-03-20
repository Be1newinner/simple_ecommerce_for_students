const { Router } = require("express");
const {
  AddListOfProductsController,
  AddSingleProductController,
  deleteProductByID,
  GetListOfProducts,
  GetSingleProduct,
  UpdateSingleProductController,
} = require("../controllers/products.controller.js");

const ProductRouter = Router();

ProductRouter.route("/").get(GetListOfProducts);
ProductRouter.route("/").post(AddSingleProductController);
ProductRouter.route("/").patch(UpdateSingleProductController);
ProductRouter.route("/bulk").post(AddListOfProductsController);
ProductRouter.route("/:sku").get(GetSingleProduct);
ProductRouter.route("/:sku").delete(deleteProductByID);

module.exports = {
  ProductRouter
}