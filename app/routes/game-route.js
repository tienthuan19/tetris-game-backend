const gameController = require("../controllers/game-controller");
const authToken = require("../middlewares/auth-middelwares.js");
module.exports = (app) => {
  app.post("/api/v1/auth/game/score", [authToken], gameController.saveScore);
};
