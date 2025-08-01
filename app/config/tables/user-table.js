const getConnection = require("../database");

const createUserTable = async () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
  `;
  try {
    const connection = await getConnection();
    await connection.query(sql);
    // console.log("Bảng 'user' đã sẵn sàng!");
  } catch (err) {
    // console.error("Lỗi tạo bảng 'user':", err);
  }
};

module.exports = {
  createUserTable,
};
