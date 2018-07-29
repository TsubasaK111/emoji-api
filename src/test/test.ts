import { expect } from "chai";

import config from "../config"
import * as knex from "knex"; knex(config.db);
import db from "../db"; db(config);

import { clearTable } from "./helper.js";
// import  { forcePromiseReject } from "./helper.js";

describe("emoji_api", () => {
  let tables;

  before("initialize database", (done) => {
    tables = ["users"];
    Promise.all(tables.map(clearTable))
      .then(() => done());
  });

  it("true should be tru", () => {
    expect(true).to.be.true;
  });

  describe("users", () => {
    it("setup has run the initial migrations", (done) => {
      (knex as any)
        .select()
        .from("users")
        .then(() => done())
        .catch((e) => console.log(e));
    });

    context("with dummy data", () => {
      before("add users", (done) => {
        knex("users" as any)
          .insert([{ name: "dude" }, { name: "dudess" }])
          .then(() => {
            done();
          });
      });

      it("lists users", (done) => {
        (db as any).users.list().then((users) => {
          expect(users).to.be.an("array");
          expect(users).to.have.lengthOf(2);
          done();
        });
      });
    });
  });
});
