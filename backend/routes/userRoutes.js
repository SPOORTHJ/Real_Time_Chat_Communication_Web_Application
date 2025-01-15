const express = require("express");
const {
  registerUser, // Controller function for user registration
  authUser,     // Controller function for user login
  allUsers,     // Controller function to fetch all users
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all users (protected)
router.route("/").get(protect, allUsers);

// Route to register a new user
router.route("/").post(registerUser);

// Route to authenticate/login a user
router.post("/login", authUser);

module.exports = router;
