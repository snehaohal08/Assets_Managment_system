const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ================= GET ALL =================
router.get("/", (req, res) => {
  db.query("SELECT * FROM assets", (err, result) => {
    if (err) {
      console.log("GET Error:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});


// ================= ADD (POST) =================
router.post("/", (req, res) => {
  const {
    assetName,
    assetId,
    category,
    brandModel,
    purchaseDate,
    warrantyDate,
    age,
  } = req.body;

  const sql = `
    INSERT INTO assets 
    (assetName, assetId, category, brandModel, purchaseDate, warrantyDate, age)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [assetName, assetId, category, brandModel, purchaseDate, warrantyDate, age],
    (err, result) => {
      if (err) {
        console.log("POST Error:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Asset Added ✅" });
    }
  );
});


// ================= UPDATE =================
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    assetName,
    assetId,
    category,
    brandModel,
    purchaseDate,
    warrantyDate,
    age,
  } = req.body;

  const sql = `
    UPDATE assets SET 
    assetName = ?, 
    assetId = ?, 
    category = ?, 
    brandModel = ?, 
    purchaseDate = ?, 
    warrantyDate = ?, 
    age = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      assetName,
      assetId,
      category,
      brandModel,
      purchaseDate,
      warrantyDate,
      age,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log("UPDATE Error:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Asset Updated ✅" });
    }
  );
});


// ================= DELETE =================
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM assets WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("DELETE Error:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Asset Deleted 🗑️" });
  });
});
router.get("/assets-stats", (req, res) => {
  db.query(`
    SELECT 
      COUNT(*) AS totalAssets,
      SUM(CASE WHEN status='assigned' THEN 1 ELSE 0 END) AS assignedAssets,
      SUM(CASE WHEN status='available' THEN 1 ELSE 0 END) AS availableAssets,
      SUM(CASE WHEN status='repair' THEN 1 ELSE 0 END) AS underRepair
    FROM assets
  `, (err, result) => {
    res.json(result[0]);
  });
});

module.exports = router;