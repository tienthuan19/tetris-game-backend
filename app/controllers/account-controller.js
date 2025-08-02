const accountService = require("../services/account-service");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newAccount = await accountService.register({ username, password });
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

exports.login = (req, res) => {
  console.log("hello");
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
