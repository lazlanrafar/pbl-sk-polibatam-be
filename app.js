var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");

require("dotenv").config();

const DashboardRouter = require("./app/dashboard/dashboard.router");
const PolibatamRouter = require("./app/polibatam/polibatam.router");
const TagGroupRouter = require("./app/tag-group/tag-group.router");
const SuratKeputusanRouter = require("./app/surat-keputusan/surat-keputusan.router");
const SuratTugasRouter = require("./app/surat-tugas/surat-tugas.router");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/dashboard", DashboardRouter);
app.use("/polibatam", PolibatamRouter);
app.use("/tag-group", TagGroupRouter);
app.use("/surat-keputusan", SuratKeputusanRouter);
app.use("/surat-tugas", SuratTugasRouter);

// Link to the documents
app.get("/documents", express.static("public/documents"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
