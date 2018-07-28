const express = require("express");

const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    // return new Promise((resolve, reject) => {
    //   res.status(200).send('sup users!');
    //   resolve("sup users!");
    // });

    return db.users
      .get()
      .then((users) => {
        console.log(users);
        return users.map((user) => user.serialize())
      })
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(400).send(err.message))
  });

  return router;
};
