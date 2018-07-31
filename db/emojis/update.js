function validateEmojiId(emojiId) {
  return (typeof emojiId === "number" &&
    emojiId >= 0)
};

function validateInput(text) {
  return (typeof text === "string") &&
    (text.replace(" ", "").length > 2);
}

module.exports = (knex, Emoji) => {
  return (params) => {
    return new Promise((resolve) => {
      params.emojiId = Number(params.emojiId);
      if (!validateEmojiId(params.emojiId)) throw new Error(`Emoji id is required! ${emojiId}`);
      resolve(params);
    })
      .then(params => {
        return knex("emojis")
          .where({id: params.emojiId})
          .update({
            name: params.name,
            uri: params.uri,
            subtext: params.subtext,
          })
          .then( () => params )
      })
      .then(params => {
        return knex("emojis")
          .where({ id: params.emojiId })
          .select();
      })
      .then((emojis) => new Emoji(emojis.pop()))
      .catch(error => {
        throw new Error(`Error retrieving updated emoji: ${error}`);
      });
  };
};