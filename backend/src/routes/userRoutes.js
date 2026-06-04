const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

// GET PROFILE
router.get("/profile", protect, getProfile);

// UPDATE PROFILE (🔥 THIS WAS MISSING)
router.put("/profile", protect, updateProfile);

module.exports = router;