const { model, Schema } = require("mongoose");

const productBaseSchema = new Schema({
  price: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
})

const productSchema = new Schema({
  name: String,
  category: String,
  mrp: Number,
  stock: Number,
  sku: String,
  rating: Number,
  description: String,
}, {
  timestamps: true
});

productSchema.add(productBaseSchema);

const ProductModel = model("Product", productSchema);

module.exports = {
  productBaseSchema,
  ProductModel
}