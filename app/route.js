module.exports = function (app) {
  require("./routes/account-route")(app);
  require("./routes/score-route")(app);
};
