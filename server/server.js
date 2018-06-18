const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongo = require("./mongodb");
const dotenv = require("dotenv");
// const https = require("https");
// const fs = require("fs");

// const httpsOptions = {
//   key: fs.readFileSync("/sf.code/helpful-human-new-clone/Helpful_Human_Interview_Challenge/server/ssl/MyKey.key"),
//   cert: fs.readFileSync("/sf.code/helpful-human-new-clone/Helpful_Human_Interview_Challenge/server/ssl/MyCertificate.crt")
// };

dotenv.config({path:`/sf.code/helpful-human-new-clone/Helpful_Human_Interview_Challenge/.env`});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "https://hh-interview-challenge-mp.herokuapp.com");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("withCredentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(routes);

mongo
  .connect(process.env.MONGODB_URL)
  // .then(https.createServer(httpsOptions, app).listen(8080))
  .then(app.listen(80))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

console.log("server listening on port 80");
