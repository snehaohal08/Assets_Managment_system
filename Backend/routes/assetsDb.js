const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ================= GET ALL ASSETS =================
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM assets",
    (err, result) => {

      if (err) {
        console.log("GET Error:", err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});


// ================= EMPLOYEE WISE ASSETS =================
router.get("/employee/:empCode", (req, res) => {

  const empCode = req.params.empCode;

  const sql = `
    SELECT
      a.id,
      a.assetName,
      a.assetId,
      a.category,
      a.brandModel,
      aa.status,
      aa.condition_status,
      aa.assigned_date
    FROM asset_allocation aa

    JOIN assets a
    ON aa.asset_id = a.assetId

    WHERE aa.employee_id = ?
  `;

  db.query(sql, [empCode], (err, result) => {

    if (err) {
      console.log("EMPLOYEE ASSET ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});


// ================= ADD ASSET =================
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
    (
      assetName,
      assetId,
      category,
      brandModel,
      purchaseDate,
      warrantyDate,
      age
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
      age
    ],

    (err, result) => {

      if (err) {
        console.log("POST Error:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Asset Added ✅"
      });
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
      id
    ],

    (err, result) => {

      if (err) {
        console.log("UPDATE Error:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Asset Updated ✅"
      });
    }
  );
});


// ================= DELETE =================
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM assets WHERE id = ?",
    [id],

    (err, result) => {

      if (err) {
        console.log("DELETE Error:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Asset Deleted 🗑️"
      });
    }
  );
});


// ================= ADMIN STATS =================
router.get("/assets-stats", (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS totalAssets,

      SUM(
        CASE
          WHEN status='Assigned'
          THEN 1
          ELSE 0
        END
      ) AS assignedAssets,

      SUM(
        CASE
          WHEN status='Available'
          THEN 1
          ELSE 0
        END
      ) AS availableAssets,

      SUM(
        CASE
          WHEN condition_status='Need Repair'
          THEN 1
          ELSE 0
        END
      ) AS underRepair

    FROM asset_allocation
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});


module.exports = router;