module.exports = (knex, User) => {
  return (params) => {
    const name = params.name;

    return knex("users")
      .where({ name: name.toLowerCase() })
      .select()
      .then((users) => {
        if (users.length) return new User(users[0]);

        throw new Error(`Error finding user ${name}`);
      });
  };
};
