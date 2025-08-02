const scoreController = require("../controllers/score-controller");
module.exports = (app) => {
  // Route cần auth
  app.get("/api/v1/auth/score", (req, res) => {
    res.send(`User - This is your score!`);
  });
};
