const express = require("express");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");
const MethodOverride = require("method-override");
require("dotenv").config();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || "localhost";

// parse application/json
app.use(
  BodyParser.json({
    limit: "5mb",
  })
);

// parse application/vnd.api+json as json
app.use(
  BodyParser.json({
    type: "application/vnd.api+json",
  })
);

// parse application/x-www-form-urlencoded
app.use(
  BodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(MethodOverride("X-HTTP-Method-Override"));

// >>>>>>>>>>>>> Middleware setup <<<<<<<<<<<<<<
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// >>>>>>>>>>>>>> Auth Middleware <<<<<<<<<<<<<<
//app.all("/api/v1/auth/*", [require("./app/middlewares/auth-middelwares")]);

// >>>>>>>>>>>>>>>>>> Routes <<<<<<<<<<<<<<<<
require("./app/route")(app);

require("./app/models");

app.listen(3000, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
