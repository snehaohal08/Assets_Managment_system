const db = require("../config/db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey"; // 🔐 important

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      const user = result[0];

      // ✅ REAL TOKEN CREATE
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        role: user.role,
        token: token, // 🔥 real token
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  });
};

module.exports = { login };