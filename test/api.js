const { expect } = require("chai");

const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

const { clearTable, forcePromiseReject } = require("./helper.js");

describe("emoji_api", () => {
  let tables;

  before("initialize database", (done) => {
    tables = ["emojis", "tags", "emojis_tags"];
    Promise.all(tables.map(clearTable)).then(() => done());
  });

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

  describe("emojis_tags junction table", () => {
    it("setup has run the initial migrations", (done) => {
      knex("tags")
        .select()
        .then(() => done())
        .catch((e) => console.log(e));
    });
  });
});
