const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 VERY IMPORTANT (images serve)
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/assets", require("./routes/assets"));
app.use("/api/allocations", require("./routes/asstesAllocation"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Test auth route: http://localhost:5000/api/auth");
});