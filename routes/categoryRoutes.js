const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// auth already added in base path
router
  .route("/")
  .get(categoryController.fetchCategory)
  .post(categoryController.createCategory);

module.exports = router;
