const Promise = require("bluebird");

function validateEmojiId(emojiId) {
  return (typeof emojiId === "number" &&
    emojiId >= 0)
};

module.exports = (knex, Emoji) => {
  return (params) => {
    return Promise.try(() => {
      const emojiId = Number(params.emojiId);
      if (!validateEmojiId(emojiId)) throw new Error("Emoji id is required!");
      return emojiId;
    })
      .then(emojiId => {
        return knex
        .select("*")
        .from("emojis")
        // .innerJoin("emojis_tags", "emojis.id", "emojis_tags.emoji_id")
        .where("emojis.id", emojiId)
      })
      .then(emojis => {
        
        console.log(emojis)
        return new Emoji(emojis[0]);
      })
      .catch(error => {
        throw new Error(`Error getting emojis`);
      });
  };
};
