const { clearTable, forcePromiseReject } = require("./helper.js");

describe("emoji_api", () => {
  let tables;

  before("initialize database", (done) => {
    tables = ["emojis", "tags", "emojis_tags"];
    Promise.all(tables.map(clearTable)).then(() => done());
  });
  describe("_emojis.js", () => {
    require("./_emojis.js");
  });
  describe("_emojis.js", () => {
    require("./_tags.js");
  });
  describe("_emojis.js", () => {
    require("./_emojisTags.js");
  });
});
