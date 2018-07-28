const { expect } = require("chai");
``;
const config = require("../config");
const knex = require("knex")(config.db);
// const db = require("../db")(config);

const { clearTable } = require("./helper.js");
// const { forcePromiseReject } = require("./helper.js");

describe("emoji_api", () => {
  let tables;

  before("initialize database", (done) => {
    tables = ["users"];

    Promise.all(tables.map(clearTable)).then(() => done());
  });

  it("true should be tru", () => {
    expect(true).to.be.true;
  });

  describe("users", () => {
    describe("setup", () => {
      it("has run the initial migrations", (done) => {
        knex("users")
          .select()
          .then(() => done())
          .catch((e) => console.log(e));
      });
    });
  });
});
