const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  getTopLinks
}
=
require("../controllers/topLinksController");

router.get(
  "/",
  protect,
  getTopLinks
);

module.exports = router;