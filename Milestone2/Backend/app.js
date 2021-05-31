var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const express = require('express');
var cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
  
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  res.status(err.status || 500);
  res.jsonp({ error: "error" })
});

module.exports = app;
