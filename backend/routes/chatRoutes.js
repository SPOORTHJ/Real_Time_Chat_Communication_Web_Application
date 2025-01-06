const express = require("express");
const {
  accessChat,     // Controller function to access a chat by ID
  fetchChats,     // Controller function to fetch all chats for a user
  createGroupChat,  // Controller function to create a group chat
  removeFromGroup,  // Controller function to remove a user from a group
  addToGroup,       // Controller function to add a user to a group
  renameGroup,      // Controller function to rename a group chat
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to access a chat (protected)
router.route("/chat/access").post(protect, accessChat);

// Route to fetch all chats (protected)
router.route("/chats").get(protect, fetchChats);

// Route to create a group chat (protected)
router.route("/group").post(protect, createGroupChat);

// Route to rename a group chat (protected)
router.route("/group/rename").put(protect, renameGroup);

// Route to remove a user from a group chat (protected)
router.route("/group/remove").put(protect, removeFromGroup);

// Route to add a user to a group chat (protected)
router.route("/group/add").put(protect, addToGroup);

module.exports = router;
