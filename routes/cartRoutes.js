const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

// auth already added in base path
router
  .route("/")
  .get(cartController.fetchCartByUserId)
  .post(cartController.addToCart);

router
  .route("/:id")
  .delete(cartController.deleteFromCart)
  .patch(cartController.updateCart);
  
module.exports = router;
