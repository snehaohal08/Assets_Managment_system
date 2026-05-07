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

  const q1 = "SELECT COUNT(*) AS totalAssets FROM assets";
  const q2 = `
    SELECT
      SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) AS assignedAssets,
      SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS availableAssets,
      SUM(CASE WHEN condition_status = 'Need Repair' THEN 1 ELSE 0 END) AS underRepair
    FROM asset_allocation
  `;

  const q3 = "SELECT COUNT(*) AS totalIncidents FROM incidents";

  db.query(q1, (err1, r1) => {
    if (err1) return res.json(err1);

    db.query(q2, (err2, r2) => {
      if (err2) return res.json(err2);

      db.query(q3, (err3, r3) => {
        if (err3) return res.json(err3);

        res.json({
          totalAssets: r1[0].totalAssets || 0,
          assignedAssets: r2[0].assignedAssets || 0,
          availableAssets: r2[0].availableAssets || 0,
          underRepair: r2[0].underRepair || 0,
          Incidents: r3[0].totalIncidents || 0
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
    if (err) return res.json(err);

    res.json({
      total: result[0].total,
      open: result[0].openCount,
      inProgress: result[0].progressCount,
      closed: result[0].closedCount
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});