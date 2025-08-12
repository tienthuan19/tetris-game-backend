const accountController = require("../controllers/account-controller");
const authToken = require("../middlewares/auth-middelwares.js");

module.exports = (app) => {
  app.post("/api/v1/accounts/register", accountController.register);
  app.post("/api/v1/accounts/login", accountController.login);
};
