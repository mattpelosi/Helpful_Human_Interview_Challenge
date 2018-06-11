const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongo = require("./mongodb");
const dotenv = require("dotenv");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(routes);

dotenv.config();

mongo
  .connect(process.env.MONGODB_URL)
  .then(app.listen(8080))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

console.log("server listening on port 8080");
