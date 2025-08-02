const accountController = require("../controllers/account-controller");

module.exports = (app) => {
  app.post("/api/v1/accounts/register", accountController.register);
  app.post("/api/v1/accounts/login", accountController.login);

  app.get("/api/v1/accounts", accountController.getAll);
  app.get("/api/v1/accounts/:id", accountController.getOne);

  app.delete("/api/v1/accounts/:id", accountController.deleteOne);
};
