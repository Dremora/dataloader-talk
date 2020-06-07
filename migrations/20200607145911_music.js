export async function up(knex) {
  await knex.schema.createTable("artists", (t) => {
    t.bigIncrements("id").primary();
    t.string("name").notNullable();
  });

  await knex.schema.createTable("albums", (t) => {
    t.bigIncrements("id").primary();
    t.string("title").notNullable();
    t.integer("year").notNullable();
    t.bigInteger("artist_id").unsigned().notNullable();

    t.foreign("artist_id").references("id").inTable("artists");
  });

  await knex.schema.createTable("tracks", (t) => {
    t.bigIncrements("id").primary();
    t.integer("index").notNullable();
    t.string("title").notNullable();
    t.bigInteger("album_id").unsigned().notNullable();

    t.foreign("album_id").references("id").inTable("albums");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("tracks");
  await knex.schema.dropTable("albums");
  await knex.schema.dropTable("artists");
}
