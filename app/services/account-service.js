const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const Account = db.accounts;

// Check if username already exists
exports.isUsernameExited = async (username) => {
  const existing = await Account.findOne({ where: { username } });
  return existing;
};

// Hash the password
exports.hashingPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// Create a new account
exports.createAccount = async (username, hashedPassword) => {
  const newAccount = await Account.create({
    username,
    password: hashedPassword,
  });
  return {
    id: newAccount.id,
    username: newAccount.username,
    password: newAccount.password,
  };
};

// Login function
exports.login = async ({ username, password }) => {
  const user = await this.isUsernameExited(username);
  if (user === null) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { token, user: { id: user.id, username: user.username } };
};
