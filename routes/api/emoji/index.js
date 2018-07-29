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

  router.post("/", (req, res) => {
    // return new Promise((resolve, reject) => {
    //   res.status(200).send('sup emojis!');
    //   resolve("sup emojis!");
    // });

    return db.emojis
      .create({
        name: req.body.name,
        uri: req.body.uri
      })
      .then(emoji => res.status(201).json(emoji.serialize()) )
      .catch((err) => {
        if (err.message === "That username already exists") {
          return services.db.users
            .get({ username: req.body.username })
            .then((user) => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      })
  });

  

  return router;
};
