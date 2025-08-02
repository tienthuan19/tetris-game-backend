const db = require("../models");
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
