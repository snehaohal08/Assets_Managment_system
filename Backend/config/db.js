const mysql = require("mysql2");

// connection create
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", // password of mysqldb
  database: "asset_management"
});

// connect
db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;