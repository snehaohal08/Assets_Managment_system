const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ==========================
// 🔵 GET ALL (ADMIN / SUPERADMIN)
// ==========================
router.get("/", (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.employee_id,
      e.firstName,
      e.lastName,
      e.empCode,
      ast.assetName,
      ast.assetId,
      a.status,
      a.condition_status,
      a.age,
      a.warranty
    FROM asset_allocation a
    JOIN employees e ON a.employee_id = e.empCode
    JOIN assets ast ON a.asset_id = ast.assetId
    ORDER BY a.id DESC
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


// ==========================
// 🟢 GET ONLY EMPLOYEE DATA
// ==========================
router.get("/employee/:empCode", (req, res) => {
  const empCode = req.params.empCode.trim().toUpperCase();

  const query = `
    SELECT 
      a.employee_id,
      a.asset_id,
      ast.assetName,
      a.status,
      a.condition_status,
      a.age,
      a.warranty
    FROM asset_allocation a
    JOIN assets ast ON a.asset_id = ast.assetId
    WHERE UPPER(TRIM(a.employee_id)) = ?
  `;

  db.query(query, [empCode], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


// ==========================
// 🔵 ASSIGN ASSET
// ==========================
router.post("/assign", (req, res) => {
  const { employeeId, assetId, status, condition, age, warranty } = req.body;

  const query = `
    INSERT INTO asset_allocation 
    (employee_id, asset_id, status, condition_status, age, warranty)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [employeeId, assetId, status, condition, age, warranty],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Asset Assigned ✅" });
    }
  );
});

module.exports = router;