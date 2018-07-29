const config = require("../config");
const knex = require("knex")(config.db);

function clearTable(tableName) {
  return knex(tableName)
    .del()
    .catch(() => {
      /* ignore error. */
    });
}

function forcePromiseReject() {
  throw new Error("This promise should have failed, but did not.");
}

module.exports = { clearTable, forcePromiseReject };
