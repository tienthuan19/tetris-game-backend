const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

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

const Account = require("./account-model")(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  Account,
};

module.exports = db;
