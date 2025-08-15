const db = require("../models");
const sequelize = db.sequelize;
const Score = db.scores;
const Account = db.accounts;

//Save player score
exports.saveScore = async ({ userId, score }) => {
  // Check User Existence
  const user = await Account.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Save Score, Foreign Key
  const newScore = await Score.create({
    score: score,
    userId: userId,
  });

  return newScore;
};

//Get Leaderboard
exports.fetchLeaderboard = async () => {
  const leaderboard = await Score.findAll({
    group: ["userId"],
    attributes: [
      "userId",
      [sequelize.fn("MAX", sequelize.col("score")), "maxScore"],
    ],

    order: [[sequelize.col("maxScore"), "DESC"]],
    limit: 10,

    include: [
      {
        model: Account,
        as: "user",
        attributes: ["username"],
      },
    ],
    raw: true,
  });

  //Format the leaderboard
  const formattedLeaderboard = leaderboard.map((entry) => ({
    username: entry["user.username"],
    score: entry.maxScore,
  }));

  return formattedLeaderboard;
};

//Sync Scores for the player that not logged in
exports.syncScores = async (userId, scores) => {
  if (!scores || scores.length === 0) {
    return;
  }

  try {
    const highestGuestScore = Math.max(...scores);

    const userHighestScoreInDb = await Score.findOne({
      where: { userId: userId },
      order: [["score", "DESC"]],
    });

    const currentMaxScore = userHighestScoreInDb
      ? userHighestScoreInDb.score
      : 0;

    if (highestGuestScore > currentMaxScore) {
      await Score.create({
        score: highestGuestScore,
        userId: userId,
      });
    }
    return { message: "Sync completed." };
  } catch (error) {
    console.error("Error syncing scores:", error);
    throw new Error("Could not sync scores.");
  }
};
