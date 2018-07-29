
export function up(knex, Promise) {
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

export function down(knex, Promise) {
  return knex.schema.dropTable("users");
};
