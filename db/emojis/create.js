function validateInput(text) {
  return (typeof text === "string") &&
    (text.replace(" ", "").length > 2);
}

function formatInput(text) {
  return text.trim().toLowerCase();
}

module.exports = (knex, Emoji) => {
  return (params) => {
    return new Promise((resolve) => {
      if (!validateInput(params.name)) {
        throw new Error(
          "Emoji name is required! It must be unique and be at least two characters");
      }
      if (!validateInput(params.uri)) {
        throw new Error(
          "Emoji URI (URL) is required! It must be at least two characters");
      }

      const formattedParams = {
        name: formatInput(params.name),
        uri: formatInput(params.uri)
      }

      resolve(formattedParams);
    })
      .then(params => {
        return knex("emojis").insert({
          name: params.name,
          uri: params.uri
        })
          .then(() => params)
      })
      .then(params => {
        return knex("emojis")
          .where({ name: params.name })
          .select();
      })
      .then((emojis) => new Emoji(emojis.pop()))
      .catch((err) => {
        // sanitize known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That Emoji name already exists");

        // throw unknown errors
        throw err;
      });
  };
};
