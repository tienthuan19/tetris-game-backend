module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    // Define the fields for the Account model
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Account;
};
