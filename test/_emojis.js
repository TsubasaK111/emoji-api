const { expect } = require("chai");

const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

const { clearTable, forcePromiseReject } = require("./helper.js");

describe("emojis", () => {
  it("setup has run the initial migrations", (done) => {
    knex("emojis")
      .select()
      .then(() => done())
      .catch((e) => console.log(e));
  });

  describe("list endpoint", () => {
    before("add emojis", (done) => {
      knex("emojis")
        .insert([{ name: "dude", uri: " " }, { name: "dudess", uri: " " }])
        .then(() => {
          done();
        });
    });

    it("lists emojis", (done) => {
      db.emojis.list().then((emojis) => {
        expect(emojis).to.be.an("array");
        expect(emojis).to.have.lengthOf(2);
        done();
      });
    });
  });

  describe("create endpoint", (done) => {
    it("elegantly fails when given bad params", (done) => {
      const params = { name: " " };
      db.emojis
        .create(params)
        .then(forcePromiseReject)
        .catch((err) => {
          expect(err.message).to.equal(
            "Emoji name is required! It must be unique and be at least two characters"
          );
          done();
        });
    });

    xit("creates an emoji when given correct params", (done) => {
      const params = { name: " " };
      db.emojis
        .create(params)
        .then(forcePromiseReject)
        .catch((err) => {
          expect(err.message).to.equal(
            "Emoji name is required! It must be unique and be at least two characters"
          );
          done();
        });
    });
  });
});
