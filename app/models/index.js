const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");
const Account = require("./account-model");

// Tạo instance Sequelize
const sequelize = new Sequelize(
  config.DBConnectors.database,
  config.DBConnectors.username,
  config.DBConnectors.password,
  {
    host: config.DBConnectors.host,
    port: config.DBConnectors.port,
    dialect: config.DBConnectors.dialect,
    logging: false,
    define: {
      underscored: false,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 100000,
    },
  }
);

sequelize
  .sync({ alter: true }) // hoặc force: true
  .then(() => {
    console.log("✅ Synced DB!");
  })
  .catch((err) => {
    console.error("❌ Failed to sync DB:", err);
  });

module.exports = {
  sequelize,
  Account,
};
