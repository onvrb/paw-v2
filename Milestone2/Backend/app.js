var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require('cors');
const app = express();
const config = require('./config');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var databaseUtilities = require("./utilities/database");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var locationsRouter = require("./routes/locations");
var ticketsRouter = require("./routes/tickets");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    `${config.dbConnection}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async () => {
    await databaseUtilities.SeedUserTypes();
    console.log(" connected to DB!");
  })
  .catch(() => console.log(" error connecting to DB!"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/books",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
