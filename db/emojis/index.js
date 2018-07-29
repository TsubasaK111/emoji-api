
class Emoji{
  constructor(dbEmoji){
    this.id = dbEmoji.id;
    this.name = dbEmoji.name;
    this.createdAt = new Date(dbEmoji.created_at);
  }

  serialize() {
  // Formats object, removes any data that shouldn't be sent to client.
    return {
      id: this.id,
      name: this.name
    };
  };
}

module.exports = (knex) => {
  return {
    list: require("./list")(knex, Emoji),
    create: require("./create")(knex, Emoji),
  };
};
