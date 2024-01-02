const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id", productController.updateProduct);
module.exports = router;
