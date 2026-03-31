const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController"); // small c

// test route
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

// login route
router.post("/login", login);

module.exports = router;