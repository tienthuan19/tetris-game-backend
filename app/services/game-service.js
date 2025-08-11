const db = require("../models");
const sequelize = db.sequelize;
const Score = db.scores;
const Account = db.accounts;
const GameState = db.gamestates;

exports.saveScore = async ({ userId, score }) => {
  // Kiểm tra xem người dùng có tồn tại không
  const user = await Account.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Tạo bản ghi điểm mới liên kết với userId
  const newScore = await Score.create({
    score: score,
    userId: userId, // Gán khóa ngoại
  });

  return newScore;
};

//Leaderboard
exports.fetchLeaderboard = async () => {
  const leaderboard = await Score.findAll({
    // Nhóm kết quả theo từng người dùng
    group: ["userId"],
    // Chỉ lấy ra các cột cần thiết
    attributes: [
      "userId",
      // Tạo một cột ảo tên là 'maxScore' chứa điểm cao nhất
      [sequelize.fn("MAX", sequelize.col("score")), "maxScore"],
    ],
    // Sắp xếp kết quả theo điểm cao nhất giảm dần
    order: [[sequelize.col("maxScore"), "DESC"]],
    limit: 10,
    // Kết nối với bảng Account để lấy tên người dùng
    include: [
      {
        model: Account,
        as: "user", // Dùng alias 'user' đã định nghĩa trong model
        attributes: ["username"], // Chỉ lấy cột username
      },
    ],
    raw: true, // Trả về dữ liệu dạng object thuần túy cho dễ xử lý
  });

  // Định dạng lại kết quả cho gọn gàng hơn
  const formattedLeaderboard = leaderboard.map((entry) => ({
    username: entry["user.username"],
    score: entry.maxScore,
  }));

  return formattedLeaderboard;
};

// HÀM MỚI: Lưu hoặc cập nhật trạng thái game
exports.saveOrUpdateGameState = async (userId, gameStateData) => {
  // Dùng hàm findOrCreate của Sequelize cho logic "upsert"
  // Nó sẽ tìm một bản ghi với userId này.
  // Nếu tìm thấy, nó sẽ không làm gì. Nếu không, nó sẽ tạo mới.
  const [gameState] = await GameState.findOrCreate({
    where: { userId: userId },
    defaults: gameStateData, // Dữ liệu để tạo mới nếu không tìm thấy
  });

  // Sau khi đảm bảo bản ghi đã tồn tại, chúng ta cập nhật nó
  await gameState.update(gameStateData);

  return gameState;
};

// HÀM MỚI: Lấy trạng thái game đã lưu
exports.getGameState = async (userId) => {
  const gameState = await GameState.findOne({
    where: { userId: userId },
  });
  return gameState;
};

// HÀM MỚI: Xóa trạng thái game đã lưu
exports.deleteGameState = async (userId) => {
  const result = await GameState.destroy({
    where: { userId: userId },
  });
  // result sẽ là 1 nếu xóa thành công, 0 nếu không có gì để xóa
  return result;
};

// *** SỬA LẠI TOÀN BỘ HÀM NÀY ***
exports.syncScores = async (userId, scores) => {
  // Đổi tên hàm và tham số
  if (!scores || scores.length === 0) {
    return;
  }

  try {
    const highestGuestScore = Math.max(...scores);

    const userHighestScoreInDb = await Score.findOne({
      where: { userId: userId }, // Sửa: Dùng accountId
      order: [["score", "DESC"]],
    });

    const currentMaxScore = userHighestScoreInDb
      ? userHighestScoreInDb.score
      : 0;

    if (highestGuestScore > currentMaxScore) {
      await Score.create({
        score: highestGuestScore,
        userId: userId, // Sửa: Dùng accountId
      });
    }
    return { message: "Sync completed." };
  } catch (error) {
    console.error("Error syncing scores:", error);
    throw new Error("Could not sync scores.");
  }
};
