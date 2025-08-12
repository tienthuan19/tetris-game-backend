const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Import models
db.accounts = require("../models/account-model.js")(sequelize, DataTypes);
db.scores = require("../models/score-model.js")(sequelize, DataTypes);

// Define relationships
// One Account can have many Scores
db.accounts.hasMany(db.scores, { as: "scores" });
// Each Score belongs to one Account
db.scores.belongsTo(db.accounts, {
  foreignKey: "userId", // Tên khóa ngoại trong bảng Scores
  as: "user",
});

module.exports = db;
