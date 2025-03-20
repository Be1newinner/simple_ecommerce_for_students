const { model, Schema, Types } = require("mongoose");

const { productBaseSchema } = require("../models/products.model.js");

const CartPricingSchema = new Schema({
  subtotal: { type: Number, required: true, min: 0, default: 0 },
  tax: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, required: true, min: 0, default: 0 },
})

const cartItemSchema = new Schema({
  _id: {
    type: Types.ObjectId, ref: "products"
  },
  qty: { type: Number, required: true, min: 0, default: 0 },
  subtotal: { type: Number, required: true, min: 0, default: 0 }, // ( this is price - discount on this product ) * qty 
}, {
  autoIndex: true,
  _id: false
})

cartItemSchema.add(productBaseSchema)

const CartSchema = new Schema(
  {
    items: { type: [cartItemSchema], required: true },
    _id: {
      type: Types.ObjectId, ref: "users"
    },
    total: { type: Number, required: true, min: 0, default: 0 },
  },
  {
    autoIndex: true,
    _id: false,
    timestamps: true
  }
);

CartSchema.add(CartPricingSchema);

const CartModel = model("Cart", CartSchema);

module.exports = {
  CartPricingSchema,
  cartItemSchema,
  CartModel
}