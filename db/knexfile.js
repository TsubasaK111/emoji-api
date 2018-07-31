const config = require("../config.js");

// Pass this file in `--knexfile` argument when
// executing any `knex migrate:...` cli commands.
const knexConfigs = {
  ...config.db,
  pool: { min: 2, max: 10 },
  migrations: { tableName: "knex_migrations" },
};

module.exports = knexConfigs;
