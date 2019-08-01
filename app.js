var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");

var app = express();

const MAX_AGE = 1000 * 60 * 15; // m/s (15 minutes)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.locals.moment = require('moment'); //date & time library

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  path: '/',
  secret: '%fujx%8T-Ne+UaGajT4rRAP=',
  httpOnly: true, //True blocks client side javascript from seeing cookie
  resave: false, //If session hasn't been modified then dont write to session store
  saveUninitialized: false, //Session is created by defualt. If not modified by req. don't save to session store
  cookie: {
    maxAge: MAX_AGE,
    sameSite: true,
    secure: false, //True is recommended but requires https website (use false for dev env)
  },
}));
app.use(express.static(path.join(__dirname, "public"))); //severs static.img,.css,.js files from public dir
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/user/", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
