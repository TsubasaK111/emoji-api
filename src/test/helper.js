const config = require("../config");
const knex = require("knex")(config.db);

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

module.exports = { clearTable, forcePromiseReject };
