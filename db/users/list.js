module.exports = (knex, User) => {
  return () => {
    return knex
      .select("*")
      .from("users")
      .then(users => {
        return users.map( user => new User(user));
      })
      .catch(error => {
        throw new Error(`Error getting users`);
      });
  };
};
