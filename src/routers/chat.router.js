const express = require("express");
const { chatController } = require("../modules/chat/index");
const authentication = require("../middlewares/auth.middleware");
const router = express.Router();
router
  .route("/")
  .post(authentication, chatController.getCreateChat)
  .get(authentication, chatController.getAllChats);
router.post("/group", authentication, chatController.createGroupChat);
module.exports = router;
