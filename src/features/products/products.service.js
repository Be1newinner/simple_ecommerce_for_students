const { ProductModel } = require("./products.model.js");

// Fetch all products
async function getListOfProductsService() {
  const data = await ProductModel.find({}, "-_id").lean();
  if (!data || !data.length) throw new Error("Products not found!");
  return data;
}

// Fetch single product by SKU
async function getSingleProductService(sku) {
  const data = await ProductModel.findOne({ sku }).lean();
  if (!data) throw new Error("Product not found");
  return data;
}

// Add multiple products
async function addListOfProductsService(products) {
  if (!Array.isArray(products) || products.length === 0)
    throw new Error("Product list is required");
  
  const data = await ProductModel.insertMany(products);
  return data;
}

// Add a single product
async function addSingleProductService(productDetails) {
  const { name, category, price, mrp, stock, sku, description } = productDetails;
  const data = await ProductModel.create({
    name,
    category,
    price,
    mrp,
    stock,
    sku,
    rating: 0,
    description,
  });
  return data;
}

// Update single product by SKU
async function updateSingleProductService(sku, updatedFields) {
  const updatedData = await ProductModel.findOneAndUpdate(
    { sku },
    updatedFields,
    { new: true }
  );
  if (!updatedData) throw new Error("Product not found or no changes to update");
  return updatedData;
}

// Delete product by SKU
async function deleteProductByIDService(sku) {
  const deletedProduct = await ProductModel.findOneAndDelete({ sku });
  if (!deletedProduct) throw new Error("Product not found");
  return deletedProduct;
}

module.exports = {
  getListOfProductsService,
  getSingleProductService,
  addListOfProductsService,
  addSingleProductService,
  updateSingleProductService,
  deleteProductByIDService,
};
