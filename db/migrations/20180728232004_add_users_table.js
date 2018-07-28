
exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", table => {
    table
      .increments()
      .index();

    table
      .string("name", 50)
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
