const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ================= ADD EMPLOYEE ================= */
router.post("/add", (req, res) => {
  const {
    empCode,
    firstName,
    middleName,
    lastName,
    email,
    contact,
    department,
    dateOfJoining
  } = req.body;

  const query = `
    INSERT INTO employees
    (empCode, firstName, middleName, lastName, email, contact, department, dateOfJoining)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [empCode, firstName, middleName, lastName, email, contact, department, dateOfJoining],
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.json({ message: "Employee Added ✅" });
    }
  );
});

/* ================= GET ALL ================= */
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Deleted ✅" });
  });
});
module.exports = router;