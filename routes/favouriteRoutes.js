const express = require("express");
const favouriteController = require("../controllers/favouriteController");
const router = express.Router();

router.route("/").get(favouriteController.fetchFavourite),
  post(favouriteController.addToFavourite);

router.route("/:id").delete(favouriteController.removeFromFavourite);

module.exports = router;
