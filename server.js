const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || "localhost";

// >>>>>>>>>>>>> Middleware setup <<<<<<<<<<<<<<
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// >>>>>>>>>>>>>>>>>> Routes <<<<<<<<<<<<<<<<
require("./app/route")(app);

app.listen(3000, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
