const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.createUser);
router
  .route("/login")
  .post(passport.authenticate("local"), authController.loginUser);
  
router
  .route("/check")
  .get(passport.authenticate("jwt"), authController.checkAuth);

module.exports = router;
