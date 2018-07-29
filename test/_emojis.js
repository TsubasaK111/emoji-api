const { expect } = require("chai");

const config = require("../config");
const knex = require("knex")(config.db);
const db = require("../db")(config);

const chaiHttp = require("chai-http");

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
        .insert([
          {
            name: "facepalm",
            uri:
              "https://emojis.slackmojis.com/emojis/images/1450319441/51/facepalm.png",
          },
          {
            name: "grumpycat",
            uri:
              "https://emojis.slackmojis.com/emojis/images/1458326965/319/grumpycat.png",
          },
        ])
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

    it("creates and returns an emoji when given correct params", (done) => {
      const params = {
        name: "angry_unicorn",
        uri:
          "https://emojis.slackmojis.com/emojis/images/1495551929/2323/angry_unicorn.png",
      };

      db.emojis.create(params).then((emoji) => {
        expect(emoji).to.include({ name: params.name });
        expect(emoji).to.include({ uri: params.uri });
        expect(emoji.id).to.be.a("number");
        done();
      });
    });
  });
});
