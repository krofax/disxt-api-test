const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const compress = require("compression");
const methodOverride = require("method-override");

const config = require("./config/env");

//express application
const app = express();

//start db
require("./config/database");

//secure apps by setting various HTTP headers
app.use(
  helmet({ dnsPrefetchControl: false, frameguard: false, ieNoOpen: false })
);

// compress request data for easy transport
app.use(compress());
app.use(methodOverride());

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());
app.use(cookieParser());

// enable detailed API logging in dev env
if (config.env === "development") app.use(logger("dev"));

//Import Route
const { publicRoutes, privateRoutes } = require("./routes/index");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// fill routes for express application
app.use("/api/v1/private", privateRoutes);
app.use("/api/v1/public", publicRoutes);

module.exports = app;
