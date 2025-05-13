const { CartModel } = require("../models/carts.model.js");
const { ProductModel } = require("../models/products.model.js");
const { UserModel } = require("../models/users.model.js");
const { TAX } = require("../constants/rates.js");
const { Types } = require("mongoose");

// Constants for tax, you can define these as needed
const TAX = 0.18;  // Example: 18% tax, modify according to your requirement

async function increaseItemQuantityService({ uid, product_id, action = "INCREASE" }) {
  const quantity = 1;
  const userId = new Types.ObjectId(uid);
  const productId = new Types.ObjectId(product_id);

  // 1. Validate user and product
  const userExist = await UserModel.exists({ _id: userId });
  if (!userExist) throw new Error("User doesn't exist!");

  const product = await ProductModel.findById(productId).select("price mrp discount").lean();
  if (!product) throw new Error("Product doesn't exist!");

  const taxCalculated = TAX * product.price * quantity;
  const totalPrice = product.price * quantity;

  let factor = action === "INCREASE" ? 1 : -1;

  // 2. Fetch the cart for the user
  const cart = await CartModel.findOne({ _id: userId }).exec();
  if (!cart) throw new Error("Cart not found!");

  const itemIndex = cart.items.findIndex(item => item._id.toString() === productId.toString());

  if (itemIndex !== -1) {
    // Item exists, update quantity and other fields
    const item = cart.items[itemIndex];

    item.qty = Math.max(item.qty + factor, 0);  // Ensure quantity doesn't go below 0
    item.subtotal = item.qty * product.price;
    item.price = item.qty * (product.price + taxCalculated);
    item.tax = item.qty * taxCalculated;
    item.discount = item.qty * product.discount;

    // Update the cart's total and subtotal
    cart.total = cart.items.reduce((total, item) => total + item.price, 0);
    cart.subtotal = cart.items.reduce((subtotal, item) => subtotal + item.subtotal, 0);
    cart.tax = cart.items.reduce((tax, item) => tax + item.tax, 0);
    cart.discount = cart.items.reduce((discount, item) => discount + item.discount, 0);
  } else {
    // Item doesn't exist, add a new item to the cart
    if (action === "INCREASE") {
      cart.items.push({
        _id: productId,
        qty: quantity,
        price: totalPrice + taxCalculated,
        subtotal: totalPrice,
        discount: product.discount,
        tax: taxCalculated,
      });

      // Update the cart's totals
      cart.total += totalPrice + taxCalculated;
      cart.subtotal += totalPrice;
      cart.tax += taxCalculated;
      cart.discount += product.discount;
    }
  }

  // 3. Save the updated cart
  await cart.save();

  // 4. Clean cart if total is zero
  if (cart.total <= 0) {
    await CartModel.deleteOne({ _id: userId });
    return { message: "Cart is empty, deleted cart entry!", data: null };
  }

  return { message: "Quantity updated for product!", data: cart };
}

async function getCartService(uid) {
  const data = await CartModel.find({ _id: uid });
  if (!data || data.length === 0) throw new Error("No Products Found!");
  return data;
}

module.exports = {
  increaseItemQuantityService,
  getCartService
};
