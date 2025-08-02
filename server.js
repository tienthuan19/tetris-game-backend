const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || "localhost";
const db = require("./app/models/index"); // models/index.js đã export sequelize

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Đã kết nối database thành công!");
  } catch (error) {
    console.error("❌ Kết nối database thất bại:", error);
  }
})();

// >>>>>>>>>>>>> Middleware setup <<<<<<<<<<<<<<
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// >>>>>>>>>>>>>>>>>> Routes <<<<<<<<<<<<<<<<
require("./app/route")(app);

app.listen(3000, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
