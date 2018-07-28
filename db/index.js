const Knex = require("knex");

module.exports = function(config) {
  // initialize a connection to the database, and pass this
  // to the various submodules within
  console.log({ ...config.db });

  const knex = Knex({ ...config.db });

  return {
    users: require("./users")(knex),
  };
};
