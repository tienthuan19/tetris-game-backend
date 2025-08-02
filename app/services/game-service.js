const db = require("../models");
const sequelize = db.sequelize;
const Score = db.scores;
const Account = db.accounts;

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
