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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import các models
db.accounts = require("../models/account-model.js")(sequelize, DataTypes);
db.scores = require("../models/score-model.js")(sequelize, DataTypes);
db.gamestates = require("./gamestate-model.js")(sequelize, DataTypes);

// Định nghĩa mối quan hệ
// Một Account có thể có nhiều Score
db.accounts.hasMany(db.scores, { as: "scores" });
// Một Score thuộc về một Account
db.scores.belongsTo(db.accounts, {
  foreignKey: "userId", // Tên khóa ngoại trong bảng Scores
  as: "user",
});

// Định nghĩa quan hệ một-một
// Mỗi Account có một GameState
db.accounts.hasOne(db.gamestates, {
  foreignKey: {
    name: "userId",
    unique: true, // Đảm bảo mỗi userId chỉ xuất hiện 1 lần
    allowNull: false,
  },
});
// Mỗi GameState thuộc về một Account
db.gamestates.belongsTo(db.accounts, {
  foreignKey: "userId",
});

module.exports = db;
