const gameController = require("../controllers/game-controller");
const authToken = require("../middlewares/auth-middelwares.js");
module.exports = (app) => {
  app.post("/api/v1/auth/game/score", [authToken], gameController.saveScore);

  app.get("/api/v1/game/leaderboard", gameController.getLeaderboard);

  app.post(
    "/api/v1/auth/game/score/sync",
    [authToken],
    gameController.syncScores
  );
};
