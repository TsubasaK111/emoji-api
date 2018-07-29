const { expect } = require("chai");

const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

const { clearTable, forcePromiseReject } = require("./helper.js");

describe("tags", () => {
  it("setup has run the initial migrations", (done) => {
    knex("tags")
      .select()
      .then(() => done())
      .catch((e) => console.log(e));
  });

  context("with dummy data", () => {
    before("add tags", (done) => {
      knex("tags")
        .insert([{ title: "dude" }, { title: "dudess" }])
        .then(() => {
          done();
        });
    });

    it("lists tags", (done) => {
      db.tags.list().then((tags) => {
        expect(tags).to.be.an("array");
        expect(tags).to.have.lengthOf(2);
        done();
      });
    });
  });
});
