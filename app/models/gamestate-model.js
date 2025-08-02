module.exports = (sequelize, DataTypes) => {
  const GameState = sequelize.define("GameState", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lines: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // Dùng kiểu JSON để lưu mảng 2 chiều của màn hình game
    board: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return GameState;
};
