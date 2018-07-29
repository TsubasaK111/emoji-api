const express = require("express");
const router = express.Router();

const emojiRouter = require("./emoji");

module.exports = (db) => {
  router.use("/emojis", emojiRouter(db));

  return router;
};
