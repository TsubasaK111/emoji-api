const { expect } = require("chai");
``;
const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

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
    it("setup has run the initial migrations", (done) => {
      knex("users")
        .select()
        .then(() => done())
        .catch((e) => console.log(e));
    });

    context("with dummy data", () => {
      before("add users", (done) => {
        knex("users")
          .insert([{ name: "dude" }, { name: "dudess" }])
          .then(() => {
            done();
          });
      });

      it("lists users", (done) => {
        db.users.list().then((users) => {
          expect(users).to.be.an("array");
          expect(users).to.have.lengthOf(2);
          done();
        });
      });
    });
  });
});
