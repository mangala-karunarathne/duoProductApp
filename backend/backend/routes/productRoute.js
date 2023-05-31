const express = require("express");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.post("/post-product", createProduct);
router.get("/get-products", getProducts);
router.get("/get-product/:id", getProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;