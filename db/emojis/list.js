module.exports = (knex, Emoji) => {
  return () => {
    return knex
      .select("*")
      .from("emojis")
      .then(emojis => {
        return emojis.map( emoji => new Emoji(emoji));
      })
      .catch(error => {
        throw new Error(`Error getting emojis`);
      });
  };
};
