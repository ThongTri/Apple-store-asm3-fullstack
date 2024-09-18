const express = require("express");
const chatRoomController = require("../controllers/chatRoomController");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .post(chatRoomController.typeOfMessage)
  .get(userController.protectRoute, chatRoomController.getRooms);

router.get("/:roomId", chatRoomController.getMessages);

module.exports = router;
