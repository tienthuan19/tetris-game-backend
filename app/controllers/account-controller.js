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
    res.setHeader("Authorization", "Bearer " + result.token);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (err) {
    res.status(401).json({ message: "Login failed", error: err.message });
  }
};

exports.getOne = async (req, res) => {
  console.log("hello");
};

exports.getAll = (req, res) => {
  console.log("hello");
};

exports.deleteOne = (req, res) => {
  console.log("hello");
};
