const mysql = require("mysql2");

const pool = mysql.createPool({
 host: "localhost",
 user: "root",
 password: "",
 database: "nomination_db"
});

module.exports = pool.promise();