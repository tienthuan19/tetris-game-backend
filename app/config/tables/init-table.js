const { createUserTable } = require("./user-table");

// This file initializes all models by creating necessary tables in the database
const initTables = async () => {
  await createUserTable();
};

module.exports = { initTables };
