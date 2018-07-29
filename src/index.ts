import * as fs from "fs";
import * as path from "path";

import * as express from "express"
//enables express to parse JSON
import * as bodyParser from "body-parser";
// logs your requests
import * as morgan from "morgan";

// import config from "../config"
const config = require("../config");
import * as db from db(config);
import * as apiRouter from "./routes/api"; apiRouter(db);

class Server {
  constructor(port) {
    this.app = express();
    this.configure();
    this.start(port);
  }

  start(port = config.express.port) {
    this.app.listen(port, () => {
      console.info(`Server up and listening on port ${port}`);
    });
  }

  configure() {
    // Middleware 'pipeline' setup.
    // https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/

    // 1. log every request to stdout AND access.log
    this.app.use(morgan('dev'));
    let logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    this.logger = morgan('combined', { stream: logStream })
    this.app.use(this.logger)

    // 2. Set the headers for incoming requests
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,OPTIONS,PATCH"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization"
      );
      next();
    });

    // 3. Parse request bodies as json
    this.app.use(bodyParser.json({ type: "application/json", limit: "2mb" }));

    // 4. If the requests begin with '/api', hand them off to API router
    this.app.use("/api", apiRouter);
    this.app.use(express.static(`${__dirname}/public`)); // otherwise serve client app

    // 5. Catch unhandled errors thrown by any of the previous middleware steps
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      if (err.stack) {
        if (err.stack.match("node_modules/body-parser")) {
          return res.status(400).send("Invalid JSON");
        }
      }
      return res.status(500).send("Internal Error.");
    });

  }
}

new Server();