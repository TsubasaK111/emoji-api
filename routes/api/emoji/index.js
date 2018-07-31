const express = require("express");

const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    return db.emojis
      .list()
      .then(emojis => emojis.map((emoji) => emoji.serve()))
      .then(emojis => res.status(200).json(emojis))
      .catch((err) => res.status(400).send(err.message))
  });

  router.get("/:emojiId", (req, res) => {
    return db.emojis
      .get(req.params)
      // .then(emoji => {
      //   return db.tags.
      // })
      // .then(emoji => emoji.serve())
      .then(emoji => res.status(200).json(emoji))
      .catch((err) => res.status(400).send(err.message))
  });

  router.post("/", (req, res) => {
    return db.emojis
      .create({ ...req.body })
      .then(emoji => res.status(200).json(emoji.serve()))
      .catch((err) => {
        if (err.message === "That emoji already exists") {
          return db.emojis
            .get({ name: req.body.name })
            .then((emoji) => res.status(200).json(emoji));
        }

        return res.status(400).send(err.message);
      })
  });

  router.delete("/:emojiId", (req, res) => {
    return db.emojis
      .delete(req.params)
      .then(emojis => emojis.map((emoji) => emoji.serve()))
      .then(emojis => res.status(200).json(emojis))
      .catch((err) => res.status(400).send(err.message))
  });

  router.patch("/:emojiId", (req, res) => {
    return db.emojis
      .update({
        ...req.body,
        emojiId: req.params.emojiId,
      })
      .then(emoji => res.status(200).json(emoji.serve()))
      .catch((err) => res.status(400).send(err.message))
  });
  return router;
};
