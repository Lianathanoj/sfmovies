'use strict';

exports.up = (Knex) => {
  return Knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
  });
};

exports.down = (Knex) => {
  return Knex.schema.dropTable('locations');
};
