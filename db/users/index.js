
class User{
  constructor(dbUser){
    this.id = dbUser.id;
    this.username = dbUser.username;
    this.createdAt = new Date(dbUser.created_at);
  }

  serialize() {
  // Formats object, removes any data that shouldn't be sent to client.
    return {
      id: this.id,
      username: this.username
    };
  };
}

module.exports = (knex) => {
  return {
    get: require("./get")(knex, User),
  };
};
