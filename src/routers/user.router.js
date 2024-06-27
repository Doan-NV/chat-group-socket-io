const express = require("express");
const { userController } = require("../modules/user/index");
const authentication  = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authentication, userController.getProfile);

module.exports = router