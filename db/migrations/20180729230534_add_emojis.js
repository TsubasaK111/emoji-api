
exports.up = function (knex, Promise) {
  return knex.schema.createTable("emojis", table => {
    table
      .increments()
      .index();

    table
      .string("name", 50)
      .unique()
      .notNullable()
      .index();

    table
      .string("uri", 255)
      .notNullable();

    table
      .string("subtext", 200)
      .nullable();

    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("emojis");
};
