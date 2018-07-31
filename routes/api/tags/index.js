const express = require("express");

const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    // return new Promise((resolve, reject) => {
    //   res.status(200).send('sup tags!');
    //   resolve("sup tags!");
    // });

    return db.tags
      .list()
      .then(tags => {
        console.log(tags);
        return tags.map((tag) => tag.serve())
      })
      .then(tags => res.status(200).json(tags))
      .catch((err) => res.status(400).send(err.message))
  });

  return router;
};
