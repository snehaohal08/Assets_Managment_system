// controllers/authController.js
const login = (req, res) => {
  const { email, password } = req.body;

  // Dummy user data
  const users = [
    { email: "admin@gmail.com", password: "Admin@1234", role: "admin" },
    { email: "employee@gmail.com", password: "Emp@123", role: "employee" },
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Success response
  res.json({
    message: "Login successful",
    token: "dummy-token", // later replace with JWT
    role: user.role
  });
};

module.exports = { login };