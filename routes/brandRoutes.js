const express = require("express");
const brandController = require("../controllers/brandController");
const router = express.Router();

// auth already added in base path
router
  .route("/")
  .get(brandController.fetchBrands)
  .post(brandController.createBrands);

module.exports = router;
