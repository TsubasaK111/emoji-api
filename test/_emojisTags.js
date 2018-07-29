const { expect } = require("chai");

const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

const { clearTable, forcePromiseReject } = require("./helper.js");

describe("emojis_tags junction table", () => {
  it("setup has run the initial migrations", (done) => {
    knex("tags")
      .select()
      .then(() => done())
      .catch((e) => console.log(e));
  });
});
