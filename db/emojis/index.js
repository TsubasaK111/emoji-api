
class Emoji{
  constructor(dbEmoji){
    this.id = dbEmoji.id;
    this.name = dbEmoji.name;
    this.uri = dbEmoji.uri;
    this.createdAt = new Date(dbEmoji.created_at);
  }

  serve() {
  // Formats object, removes any data that shouldn't be sent to client.
    return {
      id: this.id,
      name: this.name,
      uri: this.uri
    };
  };
}

module.exports = (knex) => {
  return {
    get: require("./get")(knex, Emoji),
    list: require("./list")(knex, Emoji),
    create: require("./create")(knex, Emoji),
    delete: require("./delete")(knex, Emoji),
    update: require("./update")(knex, Emoji),
  };
};
