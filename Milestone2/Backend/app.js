var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");

var databaseUtilities = require("./utilities/database");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var locationsRouter = require("./routes/locations");
var ticketsRouter = require("./routes/tickets");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    "mongodb+srv://paw:Wf6U8cKipS7aa2EV@cluster0.lxdxs.mongodb.net/paw?ssl=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async () => {
    await databaseUtilities.SeedUserTypes();
    console.log(" connected to DB!");
  })
  .catch(() => console.log(" error connecting to DB!"));

var app = express();

// view engine setup
app.use(expressLayouts);
//app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/locations", locationsRouter);
app.use("/tickets", ticketsRouter);

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

module.exports = app;
