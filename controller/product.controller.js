const { where } = require("sequelize");
const ProductModel = require("../models/product.model");

//save products to database
const save = async (req, res, next) => {
  try {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const data = await ProductModel.create({
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
    });

    res.status(201).json({
      newProduct: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

//fetch all products
const fetch = async (req, res, next) => {
  try {
    const product = await ProductModel.findAll();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err,
    });
  }
};

//delete product
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; // Use 'const' to declare userId
    if (!productId) {
      return res.status(400).json({
        error: "Id missing", // Changed 'err' to 'error'
      });
    }

    const result = await ProductModel.destroy({
      where: {
        id: productId,
      },
    });

    if (result === 1) {
      return res.status(200).json({
        success: "User deleted successfully", // Changed 'succes' to 'success'
      });
    } else {
      return res.status(404).json({
        error: "User not found", // Notify if the user with the given ID was not found
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error in deleting",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id; // Get the product ID from the request parameters

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
      updatedProduct: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error in updating product",
    });
  }
};
module.exports = { save, fetch, deleteProduct, updateProduct };
