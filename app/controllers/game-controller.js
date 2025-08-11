const gameService = require("../services/game-service");

exports.saveScore = async (req, res) => {
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

// HÀM MỚI: Controller cho leaderboard
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

// HÀM MỚI: Controller để lưu/cập nhật state
exports.saveState = async (req, res) => {
  try {
    const userId = req.userId;
    // Lấy toàn bộ object game state từ body
    const gameStateData = req.body;

    // Kiểm tra dữ liệu cơ bản
    if (!gameStateData || !gameStateData.board) {
      return res.status(400).json({ message: "Invalid game state data." });
    }

    const savedState = await gameService.saveOrUpdateGameState(
      userId,
      gameStateData
    );
    res.status(200).json({ message: "Game state saved.", data: savedState });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving game state", error: error.message });
  }
};

// HÀM MỚI: Controller để tải state
exports.loadState = async (req, res) => {
  try {
    const userId = req.userId;
    const gameState = await gameService.getGameState(userId);
    if (!gameState) {
      return res.status(404).json({ message: "No saved game state found." });
    }
    res.status(200).json(gameState);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error loading game state", error: error.message });
  }
};

// HÀM MỚI: Controller để xóa state (restart)
exports.deleteState = async (req, res) => {
  try {
    const userId = req.userId;
    await gameService.deleteGameState(userId);
    res.status(200).json({ message: "Game state deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting game state", error: error.message });
  }
};

exports.syncScores = async (req, res) => {
  try {
    const userId = req.userId; // Lấy từ token đã được xác thực
    const { scores } = req.body; // Lấy mảng điểm từ request body

    if (!scores || !Array.isArray(scores)) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ." });
    }

    await gameService.syncScores(userId, scores); // Đổi tên hàm ở đây
    res.status(200).json({ message: "Đồng bộ điểm thành công." });
  } catch (error) {
    console.error("LỖI CONTROLLER SYNC:", error);
    res.status(500).json({ message: "Lỗi máy chủ khi đồng bộ điểm." });
  }
};
