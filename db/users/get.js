module.exports = (knex, User) => {
  return (params) => {
    const name = params.name;

    return knex("users")
      .select()
      .then(users => {
        console.log(users);
        if (users.length) return new User(users[0]);

        throw new Error(`Error finding user ${name}`);
      });
  };
};
