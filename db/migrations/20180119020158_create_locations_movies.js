'use strict';

exports.up = (Knex) => {
  return Knex.schema.createTable('locations_movies', (table) => {
    table.increments('id').primary();
    table.integer('movie_id').references('movies.id');
    table.integer('location_id').references('locations.id');
  });
};

exports.down = (Knex) => {
  return Knex.schema.dropTable('locations_movies');
};
