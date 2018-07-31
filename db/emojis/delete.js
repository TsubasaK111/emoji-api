function validateEmojiId(emojiId) {
  return (typeof emojiId === "number" &&
    emojiId >= 0)
};

module.exports = (knex, Emoji) => {
  return (params) => {
    return new Promise((resolve) => {
      const emojiId = Number(params.emojiId);
      if (!validateEmojiId(emojiId)) throw new Error("Emoji id is required!");

      resolve(emojiId);
    })
      .then(emojiId => {
        return knex("emojis")
          .where("id", emojiId)
          .del()
      })
      .then(() => {
        return knex
          .select("*")
          .from("emojis")
      })
      .then(emojis => {
        return emojis.map(emoji => new Emoji(emoji));
      })
      .catch(error => {
        throw new Error(`Error getting emojis`);
      });
  };
};