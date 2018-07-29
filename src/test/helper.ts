import * as config from "../config"
import * as knex from "knex";
knex(config.db);

function clearTable(tableName) {
  return knex(tableName)
    .del()
    .catch(ignoreError);
}

function ignoreError() {
  // do nothing
}

function forcePromiseReject() {
  throw new Error("This promise should have failed, but did not.");
}

console.log("helper dawgs");

export { clearTable, forcePromiseReject };
