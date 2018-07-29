const Knex = require("knex");

module.exports = function(config) {
  // initialize connection to database,
  // pass connection to submodules.
  const knex = Knex({ ...config.db });

  const emojiModel = require("./emojis");
  const tagModel = require("./tags");

  return {
    emojis: emojiModel(knex),
    tags: tagModel(knex),
  };
};
