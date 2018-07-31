const Promise = require("bluebird");

function validateTagId(tagId) {
  return (typeof tagId === "number" &&
    tagId >= 0)
};

module.exports = (knex, Tag) => {
  return (params) => {
    return Promise.try( () => {
      const tagId = Number(params.tagId);
      if (!validateTagId(tagId)) throw new Error("Tag id is required!");

      return tagId;
    })
      .then(tagId => {
        console.log(`tagId`, tagId);
        return knex("tags")
          .where("id", tagId)
          .del()
      })
      .then(result => console.log(`deleteresult:`,result))
      .then(() => {
        return knex
          .select("*")
          .from("tags")
      })
      .then(tags => {
        return tags.map(tag => new Tag(tag));
      })
      .catch(error => {
        throw new Error(`Error getting tags`);
      });
  };
};