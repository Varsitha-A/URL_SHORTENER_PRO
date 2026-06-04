require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Import redirect controller
const {
  redirectUrl,
} = require("./src/controllers/urlController");

connectDB();


// Clean Short URL Route
app.get("/:shortCode", redirectUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});