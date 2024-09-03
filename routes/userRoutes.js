const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/own").get(userController.fetchUserById);
router.route("/:id").patch(userController.updateUser);

module.exports = router;
