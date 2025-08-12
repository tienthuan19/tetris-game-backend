const express = require("express");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");
const MethodOverride = require("method-override");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./app/config/swagger");

const port = process.env.PORT;
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

// >>>>>>>>>>>>>>>>>> Swagger UI <<<<<<<<<<<<<<<<
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// >>>>>>>>>>>>>>>>>>>> Routes <<<<<<<<<<<<<<<<<<<<<
require("./app/route")(app);

require("./app/models");

const database = require("./app/models/index");
database.sequelize
  .sync() // Chỉ tạo bảng nếu chưa tồn tại
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
