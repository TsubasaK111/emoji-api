const config = require("../config.js");

console.log(config);

// Pass this file in `--knexfile` argument when
// executing any `knex migrate` cli commands.
const knexConfigs = {
  ...config.db,
  pool: { min: 2, max: 10 },
  migrations: { tableName: "knex_migrations" },
};

// console.log(knexConfigs);
module.exports = knexConfigs;
