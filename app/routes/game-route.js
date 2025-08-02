const gameController = require("../controllers/game-controller");
const authToken = require("../middlewares/auth-middelwares.js");
module.exports = (app) => {
  app.post("/api/v1/auth/game/score", [authToken], gameController.saveScore);
  //đăng nhập thì lưu điểm vào db
  //không dăng nhập thì lưu vào localstorage
  //nếu đăng nhập xong thì lấy cái điểm từ localstorage lưu vào database
  app.get("/api/v1/game/leaderboard", gameController.getLeaderboard);
};
