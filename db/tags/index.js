class Tag{
  constructor(dbTag){
    this.id = dbTag.id;
    this.title = dbTag.title;
    this.createdAt = new Date(dbTag.created_at);
  }

  serve() {
    // Formats object, removes any data that shouldn't be sent to client.
    return {
      id: this.id,
      title: this.title
    };
  };
}

module.exports = (knex) => {
  return {
    get: require("./get")(knex, Tag),
    list: require("./list")(knex, Tag),
    create: require("./create")(knex, Tag),
    delete: require("./delete")(knex, Tag),
  };
};
