const {
  getListOfProductsService,
  getSingleProductService,
  addListOfProductsService,
  addSingleProductService,
  updateSingleProductService,
  deleteProductByIDService,
} = require("./products.service.js");

// Fetch All Products
async function getListOfProductsController(req, res) {
  try {
    const data = await getListOfProductsService();
    res.status(200).json({
      error: null,
      message: "Products fetched successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch products",
      data: null,
    });
  }
}

// Fetch Single Product by SKU
async function getSingleProductController(req, res) {
  try {
    const { sku } = req.params;
    const data = await getSingleProductService(sku);
    res.status(200).json({
      error: null,
      message: "Product fetched successfully!",
      data,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Product not found",
      data: null,
    });
  }
}

// Add Multiple Products
async function addListOfProductsController(req, res) {
  try {
    const products = req.body;
    const data = await addListOfProductsService(products);
    res.status(201).json({
      error: null,
      message: "Products added successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to add products",
      data: null,
    });
  }
}

// Add Single Product
async function addSingleProductController(req, res) {
  try {
    const productDetails = req.body;
    const data = await addSingleProductService(productDetails);
    res.status(201).json({
      error: null,
      message: "Product added successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to add product",
      data: null,
    });
  }
}

// Update Single Product by SKU
async function updateSingleProductController(req, res) {
  try {
    const { sku } = req.params;
    const updatedFields = req.body;
    const data = await updateSingleProductService(sku, updatedFields);
    res.status(200).json({
      error: null,
      message: "Product updated successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update product",
      data: null,
    });
  }
}

// Delete Product by SKU
async function deleteProductByIDController(req, res) {
  try {
    const { sku } = req.params;
    await deleteProductByIDService(sku);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete product",
      data: null,
    });
  }
}

module.exports = {
  getListOfProductsController,
  getSingleProductController,
  addListOfProductsController,
  addSingleProductController,
  updateSingleProductController,
  deleteProductByIDController,
};
