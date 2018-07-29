
exports.up = function (knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table
      .increments()
      .index();

    table
      .string("title", 50)
      .unique()
      .notNullable()
      .index();

    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("tags");
};
