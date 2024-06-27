const express = require("express");
const authentication = require("../middlewares/auth.middleware");
const { messageController } = require("../modules/message/index");
const router = express.Router();


router.get("/:chatId", authentication, messageController.getAllMessage);
router.post("/", authentication, messageController.sendMessage);

module.exports = router