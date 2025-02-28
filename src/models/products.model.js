import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  mrp: Number,
  stock: Number,
  sku: String,
  rating: Number,
  description: String,
}, {
  timestamps: true
});

export const ProductModel = model("Product", productSchema);
