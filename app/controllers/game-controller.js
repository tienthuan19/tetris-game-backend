const gameService = require("../services/game-service");

exports.saveScore = async (req, res) => {
  try {
    //Take userId from the authenticated request
    const userId = req.userId;
    const { score } = req.body;

    if (score === undefined) {
      return res.status(400).json({ message: "Score is required." });
    }

    const savedScore = await gameService.saveScore({ userId, score });

    res.status(201).json({
      message: "Score saved",
      data: savedScore,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving score", error: error.message });
  }
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await gameService.fetchLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leaderboard",
      error: error.message,
    });
  }
};

// Sync Scores for the player that not logged in
exports.syncScores = async (req, res) => {
  try {
    const userId = req.userId;
    const { scores } = req.body;

    if (!scores || !Array.isArray(scores)) {
      return res.status(400).json({ message: "Unvalid data!" });
    }

    await gameService.syncScores(userId, scores);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("LỖI CONTROLLER SYNC:", error);
    res.status(500).json({ message: "Can't Sync." });
  }
};
