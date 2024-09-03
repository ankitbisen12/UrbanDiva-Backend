const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router
  .route("/")
  .get(productController.fetchAllProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.fetchProductById)
  .patch(productController.updateProduct);

module.exports = router;
