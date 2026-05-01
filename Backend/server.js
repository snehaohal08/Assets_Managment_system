const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();   // 🔥 THIS MUST BE HERE

app.use(cors());
app.use(express.json());

// static
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/assets", require("./routes/assets"));
app.use("/api/assets-db", require("./routes/assetsDb"));
app.use("/api/allocations", require("./routes/asstesAllocation"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/incidents", require("./routes/incidents"));

// ================= STATS API =================
app.get("/api/assets-stats", (req, res) => {

  const q1 = "SELECT COUNT(*) AS totalAssets FROM assets";

  const q2 = `
    SELECT COUNT(*) AS assignedAssets 
    FROM asset_allocation 
    WHERE status = 'Assigned'
  `;

  db.query(q1, (err1, r1) => {
    if (err1) return res.json(err1);

    db.query(q2, (err2, r2) => {
      if (err2) return res.json(err2);

      const total = r1[0].totalAssets;
      const assigned = r2[0].assignedAssets;

      const available = total - assigned;

      res.json({
        totalAssets: total,
        assignedAssets: assigned,
        availableAssets: available,
        underRepair: 0
      });
    });
  });

});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});