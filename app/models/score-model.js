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
  });

  return Score;
};
