const Knex = require("knex");

module.exports = function(config) {
  // initialize connection to database,
  // pass connection to submodules.
  const knex = Knex({ ...config.db });

  return { emojis: require("./emojis")(knex) };
};
