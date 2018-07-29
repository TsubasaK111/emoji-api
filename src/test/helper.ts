import config from "../config"
import * as knex from "knex";
knex(config.db);

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

export { clearTable, forcePromiseReject };