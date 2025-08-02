const gameService = require("../services/game-service");

exports.savePlayerScore = async (req, res) => {
  try {
    // userId được middleware verifyToken thêm vào req
    const userId = req.userId;
    const { score } = req.body;

    if (score === undefined) {
      return res.status(400).json({ message: "Score is required." });
    }

    const savedScore = await gameService.saveScore({ userId, score });

    res.status(201).json({
      message: "Score saved successfully!",
      data: savedScore,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving score", error: error.message });
  }
};
