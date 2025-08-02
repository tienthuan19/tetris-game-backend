require("dotenv").config();
module.exports = {
  DBConnectors: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
  },
};
// // config/database.js
// require("dotenv").config();
// const mysql = require("mysql2/promise");

// const getConnection = async () => {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
//   if (!connection) {
//     throw new Error("Failed to connect to the database");
//   }
//   console.log("DB connected!");
//   return connection;
// };

// module.exports = getConnection;
