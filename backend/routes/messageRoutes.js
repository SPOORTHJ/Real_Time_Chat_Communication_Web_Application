const express = require("express");
const {
  allMessages,  // Controller function to get all messages for a specific chat
  sendMessage,  // Controller function to send a message
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all messages for a specific chat (protected)
router.route("/:chatId/messages").get(protect, allMessages);

// Route to send a message (protected)
router.route("/messages").post(protect, sendMessage);

module.exports = router;
