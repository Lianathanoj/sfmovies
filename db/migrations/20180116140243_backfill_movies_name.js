'use strict';

exports.up = (Knex) => {
  return Knex.raw('UPDATE movies SET name = title');
};

exports.down = (Promise) => {
  return Promise.resolve();
};
