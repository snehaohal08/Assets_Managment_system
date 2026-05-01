const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ================= CREATE INCIDENT =================
router.post("/", (req, res) => {
  const {
    assetId,
    employeeId,
    assetName,
    employeeName,
    issueType,
    priority,
    description,
    createdDate,
  } = req.body;

  const sql = `
    INSERT INTO incidents 
    (assetId, employeeId, assetName, employeeName, issueType, priority, description, createdDate, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      assetId,
      employeeId,
      assetName,
      employeeName,
      issueType,
      priority,
      description,
      createdDate,
      "Open" // default status
    ],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Incident Added ✅" });
    }
  );
});


// ================= GET ALL =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM incidents ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log("FETCH ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});


// ================= DELETE =================
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM incidents WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      console.log("DELETE ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Deleted ✅" });
  });
});


// ================= UPDATE STATUS =================
router.put("/:id", (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE incidents SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Status Updated ✅" });
    }
  );
});

module.exports = router;