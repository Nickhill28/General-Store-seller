const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.post("/save", productController.save);
router.get("/fetch", productController.fetch);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);
module.exports = router;
