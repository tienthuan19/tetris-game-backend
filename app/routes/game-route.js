const scoreController = require("../controllers/game-controller");
module.exports = (app) => {
  app.post("/api/v1/auth/game/score", scoreController.saveScore);
};
