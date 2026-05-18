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
// ================= ADMIN STATS =================
router.get("/assets-stats", (req, res) => {

  // TOTAL ASSETS
  const q1 = `
    SELECT COUNT(*) AS totalAssets
    FROM assets
  `;

  // ASSIGNED + AVAILABLE + REPAIR
  const q2 = `
    SELECT
      SUM(
        CASE
          WHEN status = 'Assigned'
          THEN 1
          ELSE 0
        END
      ) AS assignedAssets,

      SUM(
        CASE
          WHEN status = 'Available'
          THEN 1
          ELSE 0
        END
      ) AS availableAssets,

      SUM(
        CASE
          WHEN condition_status = 'Need Repair'
          THEN 1
          ELSE 0
        END
      ) AS underRepair

    FROM asset_allocation
  `;

  // INCIDENT COUNT
  const q3 = `
    SELECT COUNT(*) AS totalIncidents
    FROM incidents
  `;

  db.query(q1, (err1, r1) => {

    if (err1) {
      console.log(err1);
      return res.status(500).json(err1);
    }

    db.query(q2, (err2, r2) => {

      if (err2) {
        console.log(err2);
        return res.status(500).json(err2);
      }

      db.query(q3, (err3, r3) => {

        if (err3) {
          console.log(err3);
          return res.status(500).json(err3);
        }

        const totalAssets =
          r1[0].totalAssets || 0;

        const assignedAssets =
          r2[0].assignedAssets || 0;

        res.json({
          totalAssets,

          assignedAssets,

          remainingAssets:
            totalAssets - assignedAssets,

          availableAssets:
            r2[0].availableAssets || 0,

          underRepair:
            r2[0].underRepair || 0,

          Incidents:
            r3[0].totalIncidents || 0,
        });

      });
    });
  });
});


module.exports = router;