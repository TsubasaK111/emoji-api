const { expect } = require("chai");
``;
const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config.db);

const { clearTable, forcePromiseReject } = require("./helper.js");

describe("dawgs", () => {
  let tables;

  before("initialize database", (done) => {
    tables = ["channel_messages", "user_messages", "users", "channels"];

    Promise.all(tables.map(clearTable)).then(() => done());
  });

  it("true should be tru", () => {
    expect(true).to.be.true;
  });
});
