const { ProductModel } = require("../models/products.model.js");

// Fetch All Products
async function GetListOfProducts(req, res) {
  try {
    const data = await ProductModel.find({}, "-_id").lean();

    if (!data || !data.length) throw new Error("Products not found!")

    res.status(200).json({
      error: null,
      message: "Products fetched successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch products",
      data: null,
    });
  }
}

// Fetch Single Product by SKU
async function GetSingleProduct(req, res) {
  try {
    const { sku } = req.params;
    const data = await ProductModel.findOne({ sku }).lean();

    if (!data) {
      res.status(404).json({
        error: "Product not found",
        message: "",
        data: null,
      });
      return; //Intentionaly we are not retruning res instead empty return;
    }

    res.status(200).json({
      error: null,
      message: "Product fetched successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: "Failed to fetch product",
      data: null,
    });
  }
}

// Add Multiple Products
async function AddListOfProductsController(req, res) {
  try {
    const body = req.body;

    if (!Array.isArray(body) || body.length === 0)
      return res.status(400).json({
        error: "Invalid input",
        message: "Product list is required",
        data: null,
      });

    const data = await ProductModel.insertMany(body);

    res.status(201).json({
      error: null,
      message: "Products added successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: "Failed to add products",
      data: null,
    });
  }
}

// Add Single Product
async function AddSingleProductController(req, res) {
  try {
    const { name, category, price, mrp, stock, sku, description } =
      req.body;

    if (!name || !category || !price || !mrp || !stock || !sku) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Please provide all required details",
        data: null,
      });
    }

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

    res.status(201).json({
      error: null,
      message: "Product added successfully!",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to add product",
      data: null,
    });
  }
}

// Update Single Product by SKU
async function UpdateSingleProductController(
  req,
  res
) {
  try {
    const { name, category, price, mrp, stock, sku, description, rating } =
      req.body;

    if (!sku) {
      let error = new Error("SKU is Required!");
      error.statusCode = 400;
      throw error;
    }

    if (!(name || category || price || mrp || stock || description || rating)) {
      let error = new Error("Atleast one field to update is required!");
      error.statusCode = 400;
      throw error;
    }

    // console.log({ sku })

    const updatedData = await ProductModel.findOneAndUpdate(
      { sku },
      { name, category, price, mrp, stock, description, rating },
      { new: true }
    );

    console.log(updatedData)

    if (!updatedData)
      return res.status(404).json({
        error: "Product not found",
        message: "No product found with the given SKU",
        data: null,
      });

    res.status(200).json({
      error: null,
      message: "Product updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message,
      message: "Failed to update product",
      data: null,
    });
  }
}

// Delete Product by SKU
async function deleteProductByID(req, res) {
  try {
    const { sku } = req.params;

    const deletedProduct = await ProductModel.findOneAndDelete({ sku });

    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found",
        message: "No product found with the given SKU",
        data: null,
      });

    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to delete product",
      data: null,
    });
  }
}

module.exports = {
  GetListOfProducts,
  GetSingleProduct,
  AddListOfProductsController,
  AddSingleProductController,
  UpdateSingleProductController,
  deleteProductByID,
}