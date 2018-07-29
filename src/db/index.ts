import * as Knex from "knex";
import users from "./users";

export default function(config) {
  // initialize connection to database,
  // pass connection to submodules.
  const knex = Knex({ ...config.db });

  return { users: users(knex) };
};
