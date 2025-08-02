module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define("Score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Trường userId sẽ được Sequelize tự động thêm vào khi chúng ta định nghĩa mối quan hệ
  });

  return Score;
};
