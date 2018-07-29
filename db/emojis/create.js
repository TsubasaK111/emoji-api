const Promise = require("bluebird");

const validateEmojiname = (name) => {
  return (typeof name === "string") && 
    (name.replace(" ", "").length > 2);
}

module.exports = (knex, Emoji) => {
  return (params) => {
    const name = params.name;

    return Promise.try(() => {
      if (!validateEmojiname(name))
        throw new Error(
          "Emoji name is required! It must be unique and be at least two characters"
        );
    })
      .then(() => knex("emojis").insert({ name: name.toLowerCase() }))
      .then(() => {
        return knex("emojis")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((emojis) => new Emoji(emojis.pop())) 
      .catch((err) => {
        // sanitize known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That Emoji name already exists");

        // throw unknown errors
        throw err;
      });
  };
};
