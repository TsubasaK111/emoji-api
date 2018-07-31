const Promise = require("bluebird");

function validateTagId(tagId) {
  return (typeof tagId === "number" &&
    tagId >= 0)
};

module.exports = (knex, Tag) => {
  return (params) => {
    return Promise.try(() => {
      const tagId = Number(params.tagId);
      if (!validateTagId(tagId)) throw new Error("Tag id is required!");
      return tagId;
    })
      .then(tagId => {
        return knex
          .select("*")
          .from("tags")
          .where("id", tagId)
      })
      .then(tags => new Tag(tags[0]))
      .catch(error => {
        throw new Error(`Error getting tags`);
      });
  };
};
