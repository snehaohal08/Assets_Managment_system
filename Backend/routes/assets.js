const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🔥 STATIC ASSETS (images + names)
const Assets = [
  { id: 1, name: "Printer", image: "http://localhost:5000/images/Assets_img/printer.png" },
  { id: 2, name: "Keyboard", image: "http://localhost:5000/images/Assets_img/kb.png" },
  { id: 3, name: "Projector", image: "http://localhost:5000/images/Assets_img/projector.png" },
  { id: 4, name: "Laptop", image: "http://localhost:5000/images/Assets_img/lap.png" },
  { id: 5, name: "Accessories Components", image: "http://localhost:5000/images/Assets_img/AC.svg" },
  { id: 6, name: "Router", image: "http://localhost:5000/images/Assets_img/roter.png" },
  { id: 7, name: "LAN Cable", image: "http://localhost:5000/images/Assets_img/lan.png" },
  { id: 8, name: "Software Licenses", image: "http://localhost:5000/images/Assets_img/softwareLicenses.svg" },
  { id: 9, name: "Cloud Asset", image: "http://localhost:5000/images/Assets_img/cloud.png" },
  { id: 10, name: "Docking Station", image: "http://localhost:5000/images/Assets_img/docking.png" }
];

// 🔥 GET API (WITH FIXED COUNT LOGIC)
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      LOWER(TRIM(assetName)) AS assetName,
      COUNT(*) AS total
    FROM assets
    GROUP BY LOWER(TRIM(assetName))
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    console.log("DB RESULT:", result);

    // 🔥 merge static + DB count
    const finalData = Assets.map((item) => {
      const found = result.find(
        r => r.assetName === item.name.toLowerCase().trim()
      );

      return {
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: found ? found.total : 0
      };
    });

    res.json(finalData);
  });
});

module.exports = router;