const ProductModel = require("../models/product.model");

// Create a product
const createProduct = async (req, res, next) => {
  try {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const data = await ProductModel.create({
      itemName,
      description,
      price,
      quantity,
    });

    res.status(201).json({
      newProduct: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new product" });
  }
};

// Fetch all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID missing",
      });
    }

    const result = await ProductModel.destroy({
      where: {
        id: productId,
      },
    });

    if (result === 1) {
      return res.status(200).json({
        success: "Product deleted successfully",
      });
    } else {
      return res.status(404).json({
        error: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error in deleting product",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is missing",
      });
    }

    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const existingProduct = await ProductModel.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    // Update the product attributes
    existingProduct.itemName = itemName;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.quantity = quantity;

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error in updating product",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
