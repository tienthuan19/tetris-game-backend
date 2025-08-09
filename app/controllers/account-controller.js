const db = require("../models");
const Account = db.accounts; // Lấy model 'accounts' từ đối tượng db

const accountService = require("../services/account-service");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isExited = await accountService.isUsernameExited(username);
    if (isExited) {
      throw new Error("Username exited");
    }

    const hashedPassword = await accountService.hashingPassword(password);
    const newAccount = await accountService.createAccount(
      username,
      hashedPassword
    );
    res.status(201).json({
      message: "Register success!",
      data: newAccount,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await accountService.login({ username, password });
    // Đặt token vào header
    // bearer là tiền tố thường dùng cho token

    res.setHeader("Authorization", "Bearer " + result.token);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (err) {
    res.status(401).json({ message: "Login failed", error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    // middleware 'auth' đã xác thực token và gắn user id vào req.user.id
    // Dùng phương thức 'findByPk' (Find by Primary Key) của Sequelize
    const user = await Account.findByPk(req.user.id, {
      // Sử dụng thuộc tính 'attributes' để loại bỏ trường password
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về đối tượng user đã tìm thấy (không có password)
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// exports.getAll = (req, res) => {
//   console.log("hello");
// };

// exports.deleteOne = (req, res) => {
//   console.log("hello");
// };
