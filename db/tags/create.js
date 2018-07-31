const Promise = require("bluebird");

function validateInput(text) {
  return (typeof text === "string") &&
    (text.replace(" ", "").length > 2);
}

function validateEmojiId(emojiId) {
  return (typeof emojiId === "number" &&
    emojiId >= 0)
};

function formatInput(text) {
  return text.trim().toLowerCase().replace(" ", "_");
}

module.exports = (knex, Tag) => {
  return (params) => {

    return Promise.try(() => {
      if (!validateInput(params.title)) {
        throw new Error(
          "Tag title is required! It must be unique and be at least two characters");
      }

      const formattedParams = {
        title: formatInput(params.title),
        emojiId: params.emojiId
      }

      return formattedParams;
    })
      .then(params => {
        return knex("tags")
          .insert({ title: params.title })
          .then(() => params);
      })
      .then(params => {
        return knex("tags")
          .where({ title: params.title })
          .select()
          .then((newTags) => {
            return { ...newTags.pop(), emojiId: params.emojiId };
          });
      })
      .then(tag => {
        return knex("emojis_tags")
          .insert({
            emoji_id: tag.emojiId,
            tag_id: tag.id
          })
          .then(() => tag);
      })
      .then((tag) => new Tag(tag))
      .catch((err) => {
        // sanitize known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That Tag title already exists");

        // throw unknown errors
        throw err;
      });
  };
};
