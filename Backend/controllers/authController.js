const db = require("../config/db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT 
      u.id, u.email, u.role,
      e.empCode, e.firstName
    FROM users u
    LEFT JOIN employees e ON u.email = e.email
    WHERE u.email = ? AND u.password = ?
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result[0];

    // ✅ TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        empCode: user.empCode
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      role: user.role,
      empCode: user.empCode,   // 🔥 MOST IMPORTANT
      name: user.firstName
    });
  });
};

module.exports = { login };