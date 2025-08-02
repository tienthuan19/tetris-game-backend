const bcrypt = require("bcrypt");
const sequelize = require("../models");
const Account = sequelize.Account;

exports.register = async ({ username, password }) => {
  const existing = await Account.findOne({ where: { username } });
  if (existing) {
    throw new Error("Username exited");
  }

  const hashedPassword = await bcrypt.hash(password, 10); // hash với saltRounds = 10

  const newAccount = await Account.create({
    username,
    password: hashedPassword,
  });

  return {
    id: newAccount.id,
    username: newAccount.username,
  };
};
