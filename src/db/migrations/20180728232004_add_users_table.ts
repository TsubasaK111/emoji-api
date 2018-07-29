import * as Knex from "knex";

export function up(knex: Knex, Promise) {
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

export function down(knex: Knex, Promise) {
  return knex.schema.dropTable("users");
};
