const express = require("express");
const router = express.Router();

const userRouter = require("./user");

module.exports = (db) => {
  router.use("/users", userRouter(db));

  return router;
};
