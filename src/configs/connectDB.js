import mysql from "mysql2/promise";

console.log("Create connection pool...");
// create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});

// simple query
// connection.query(
//   'SELECT * FROM `users` ',
//   function(err, results, fields) {
//     console.log('>>> Check mysql');
//     console.log(results); // results contains rows returned by server
//     console.log(results[0]); // results contains rows returned by server

//   }
// );

export default pool;
