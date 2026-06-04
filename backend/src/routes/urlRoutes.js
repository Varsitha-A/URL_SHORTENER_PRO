const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createUrl,
  getMyUrls,
  getUrlById,
  updateUrl,
  deleteUrl,
  redirectUrl,
} = require("../controllers/urlController");

// ==============================
// CREATE URL
// ==============================
router.post("/create", protect, createUrl);

// ==============================
// GET USER URLs
// ==============================
router.get("/my-urls", protect, getMyUrls);

// ==============================
// GET SINGLE URL DETAILS
// ==============================
router.get("/:id/details", protect, getUrlById);

// ==============================
// UPDATE URL
// ==============================
router.put("/:id", protect, updateUrl);

// ==============================
// DELETE URL
// ==============================
router.delete("/:id", protect, deleteUrl);

// ==============================
// PUBLIC REDIRECT (IMPORTANT - KEEP LAST)
// ==============================
router.get("/r/:shortCode", redirectUrl);

module.exports = router;