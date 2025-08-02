const scoreController = require("../controllers/score-controller");
module.exports = (app) => {
  // Route không cần auth
  app.get("/api/v1/game/info", (req, res) => {
    res.send("Game info public");
  });

  // Route cần auth
  app.get("/api/v1/auth/score", (req, res) => {
    res.send(`User - This is your score!`);
  });
};
