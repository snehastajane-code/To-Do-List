const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",   // Use your MySQL Workbench password
    database: "todo_app"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = db;