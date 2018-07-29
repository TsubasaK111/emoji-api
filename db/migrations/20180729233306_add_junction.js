
exports.up = function (knex, Promise) {
  return knex.schema.createTable("emojis_tags", table => {
    table
      .increments()
      .index();

    table
      .integer("emoji_id")
      .unsigned()
      .notNullable();

    table
      .foreign("emoji_id")
      .references("id")
      .inTable("emojis")
      .onDelete("CASCADE");

    table
      .integer("tag_id")
      .unsigned()
      .notNullable();

    table
      .foreign("tag_id")
      .references("id")
      .inTable("tags");
  });

  // ALTER TABLE "emoji_tags" ADD CONSTRAINT "emoji_tags_fk0" FOREIGN KEY ("emoji_id") REFERENCES "emojis"("id");
  // ALTER TABLE "emoji_tags" ADD CONSTRAINT "emoji_tags_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("emojis_tags");

  // ALTER TABLE "emoji_tags" DROP CONSTRAINT IF EXISTS "emoji_tags_fk0";
  // ALTER TABLE "emoji_tags" DROP CONSTRAINT IF EXISTS "emoji_tags_fk1";
};
