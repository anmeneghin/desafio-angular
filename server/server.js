import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import bodyParser from "body-parser";

import express from "express";
import cors from "cors";
import * as devicesRoutes from "./routes/devices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var privateKey = fs.readFileSync(path.resolve(__dirname, "./key.pem"), {
  encoding: "utf8",
});
var certificate = fs.readFileSync(path.resolve(__dirname, "./cert.pem"), {
  encoding: "utf8",
});

var credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.options(`*`, cors(), (req, res) => {
  res.status(200).send();
});
app.use("/", cors(), devicesRoutes.default);

app.use(cors(), (req, res, next) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`JSON Server is running at https://localhost:${PORT}`);
});

export default app;
