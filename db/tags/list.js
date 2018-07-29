module.exports = (knex, Tag) => {
  return () => {
    return knex
      .select("*")
      .from("tags")
      .then(tags => {
        return tags.map( tag => new Tag(tag));
      })
      .catch(error => {
        throw new Error(`Error getting tags`);
      });
  };
};
