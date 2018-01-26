'use strict';

const Knex      = require('./knex');
const Bookshelf = require('bookshelf')(Knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;
