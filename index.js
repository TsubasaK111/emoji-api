// DEPENDENCIES

const config = require("./config.js");
// Database and other interfacing with external APIs)
const services = require("./services")(config);
// Routes. Initialized 'services' dependencies are explicitly injected.
const apiRouter = require("./routes/api")(services);
// logs your requests
const morgan = require("morgan"); 
//enables express to parse JSON
const bodyParser = require("body-parser"); 

const express = require("express");

const app = express();


// SERVER SETUP
// Middleware 'pipeline' setup.
// https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/

// 1. log every request to stdout AND access.log
app.use(morgan('dev'));
let logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
let logger = morgan('combined', {stream: logStream})
app.use(logger)

// 2. Set the headers for incoming requests
app.use((req, res, next) => {
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
app.use(bodyParser.json({ type: "application/json", limit: "5mb" }));

// 4. If the requests begin with '/api', hand them off to the API router
app.use("/api", apiRouter);
app.use(express.static(`${__dirname}/public`)); // otherwise load the client app

// 5. Catch unhandled errors thrown by any of the previous middleware steps
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser")) {
      return res.status(400).send("Invalid JSON");
    }
  }
  
  return res.status(500).send("Internal Error.");
});

// START SERVER
app.listen(config.express.port, () => {
  logger.log(`Server up and listening on port ${config.express.port}`);
});
