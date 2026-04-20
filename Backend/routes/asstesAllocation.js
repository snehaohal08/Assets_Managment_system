const express = require("express");
const router = express.Router();

const allocations = [
  {
    id: 1,
    assetName: "Laptop",
    assignedTo: "Sneha",
    assignedDate: "2026-03-31",
    status: "Assigned",
    expiry: "2027-03-31",
    condition:"Needs Repair",
    Age:"2.2yr"
  },
  {
    id: 2,
    assetName: "Router",
    assignedTo: "Mosin",
    assignedDate: "",
    status: "Available",
    expiry: "",
    condition:"Needs Repair",
    Age:"1.1yr"
  },
  {
    id: 3,
    assetName: "Printer",
    assignedTo: "Rahul",
    assignedDate: "2026-03-20",
    status: "Assigned",
    expiry: "2026-04-01", // will become Expired
    condition:"Needs Repair",
    Age:"2.1yr"
  },
  {
    id: 4,
    assetName: "Keyboard",
    assignedTo: "Amit",
    assignedDate: "2026-03-25",
    status: "rpaired",
    expiry: "2026-05-01",
    condition:"Good",
    Age:"2.1yr"
  }
];

router.get("/", (req, res) => {
  res.json(allocations);
});

module.exports = router;