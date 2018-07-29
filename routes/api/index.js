const express = require("express");
const router = express.Router();

const emojiRouter = require("./emoji");
const tagsRouter = require("./tags");

module.exports = (db) => {
  router.use("/emojis", emojiRouter(db));
  router.use("/tags", tagsRouter(db));

  return router;
};
