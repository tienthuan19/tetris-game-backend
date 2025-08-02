const accountController = require("../controllers/account-controller");

module.exports = (app) => {
  app.get("/api/v1/auth/accounts", accountController.getOne);
};
