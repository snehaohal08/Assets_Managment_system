const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/assets", require("./routes/assets"));
app.use("/api/assets-db", require("./routes/assetsDb"));
app.use("/api/allocations", require("./routes/asstesAllocation"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/incidents", require("./routes/incidents"));

/* ================= ADMIN + SUPERADMIN STATS ================= */
app.get("/api/assets-stats", (req, res) => {

  const totalAssetsQuery = `
    SELECT COUNT(*) AS totalAssets
    FROM assets
  `;

  const assignedAssetsQuery = `
    SELECT COUNT(*) AS assignedAssets
    FROM asset_allocation
    WHERE status = 'Assigned'
  `;

  const repairQuery = `
    SELECT COUNT(*) AS underRepair
    FROM asset_allocation
    WHERE condition_status = 'Need Repair'
  `;

  const incidentQuery = `
    SELECT COUNT(*) AS totalIncidents
    FROM incidents
  `;

  db.query(totalAssetsQuery, (err1, totalResult) => {

    if (err1) {
      console.log(err1);
      return res.status(500).json(err1);
    }

    db.query(assignedAssetsQuery, (err2, assignedResult) => {

      if (err2) {
        console.log(err2);
        return res.status(500).json(err2);
      }

      db.query(repairQuery, (err3, repairResult) => {

        if (err3) {
          console.log(err3);
          return res.status(500).json(err3);
        }

        db.query(incidentQuery, (err4, incidentResult) => {

          if (err4) {
            console.log(err4);
            return res.status(500).json(err4);
          }

          const totalAssets =
            totalResult[0].totalAssets || 0;

          const assignedAssets =
            assignedResult[0].assignedAssets || 0;

          const remainingAssets =
            totalAssets - assignedAssets;

          res.json({
            totalAssets,
            assignedAssets,
            remainingAssets,
            underRepair:
              repairResult[0].underRepair || 0,
            Incidents:
              incidentResult[0].totalIncidents || 0
          });

        });
      });
    });
  });
});

/* ================= EMPLOYEE STATS ================= */
app.get("/api/employee-stats/:empCode", (req, res) => {

  const empCode = req.params.empCode;

  const q = `
    SELECT 
      COUNT(*) AS total,
      SUM(status='Open') AS openCount,
      SUM(status='In Progress') AS progressCount,
      SUM(status='Closed') AS closedCount
    FROM incidents
    WHERE employeeId = ?
  `;

  db.query(q, [empCode], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      total: result[0].total || 0,
      open: result[0].openCount || 0,
      inProgress: result[0].progressCount || 0,
      closed: result[0].closedCount || 0
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});