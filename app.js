var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./routes")(app);

const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
