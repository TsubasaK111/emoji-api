const express = require("express");

const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    // return new Promise((resolve, reject) => {
    //   res.status(200).send('sup emojis!');
    //   resolve("sup emojis!");
    // });

    return db.emojis
      .list()
      .then(emojis => {
        console.log(emojis);
        return emojis.map((emoji) => emoji.serialize())
      })
      .then(emojis => res.status(200).json(emojis))
      .catch((err) => res.status(400).send(err.message))
  });

  return router;
};
