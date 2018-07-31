const express = require("express");

const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    return db.tags
      .list()
      .then(tags => {
        console.log(tags);
        return tags.map((tag) => tag.serve())
      })
      .then(tags => res.status(200).json(tags))
      .catch((err) => res.status(400).send(err.message))
  });

  router.get("/:tagId", (req, res) => {
    return db.tags
      .get(req.params)
      .then(tag => tag.serve())
      .then(tag => res.status(200).json(tag))
      .catch((err) => res.status(400).send(err.message))
  });

  router.post("/", (req, res) => {
    return db.tags
      .create({ ...req.body })
      .then(tag => res.status(200).json(tag.serve()))
      .catch((err) => {
        if (err.message === "That tag already exists") {
          return db.tags
            .get({ name: req.body.name })
            .then((tag) => res.status(200).json(tag.serve()));
        }

        return res.status(400).send(err.message);
      })
  });

  router.delete("/:tagId", (req, res) => {
    return db.tags
      .delete(req.params)
      .then(tags => tags.map((tag) => tag.serve()))
      .then(tags => res.status(200).json(tags))
      .catch((err) => res.status(400).send(err.message))
  });


  return router;
};
