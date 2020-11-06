import express from "express";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import compress from "compression";
import methodOverride from "method-override";

//Import Route
import route from "./routes/index";
const { publicRoutes, privateRoutes } = route;

import { env } from "./config/env";

//express application
const app = express();

//start db
import "./config/database";

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
if (env === "development") app.use(logger("dev"));

//Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

// fill routes for express application
app.use("/api/v1/private", privateRoutes);
app.use("/api/v1/public", publicRoutes);

export default app;
