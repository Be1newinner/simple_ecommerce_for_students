import { model, Schema, Types } from "mongoose";

import { productBaseSchema } from "../models/products.model.js";

export const CartPricingSchema = new Schema({
  subtotal: { type: Number, required: true, min: 0, default: 0 },
  tax: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, required: true, min: 0, default: 0 },
})

export const cartItemSchema = new Schema({
  pid: {
    type: Types.ObjectId, ref: "products", required: true
  },
  qty: { type: Number, required: true, min: 0 },
  subtotal: { type: Number, required: true, min: 0 }, // ( this is price - discount on this product ) * qty 
})

cartItemSchema.add(productBaseSchema)

const CartSchema = new Schema(
  {
    items: [cartItemSchema],
    _id: {
      type: Types.ObjectId, ref: "users"
    }
  },
  {
    autoIndex: true,
    _id: false,
    timestamps: true
  }
);

CartSchema.add(CartPricingSchema);

export const CartModel = model("Cart", CartSchema);
