'use strict';

const Bookshelf = require('../libraries/bookshelf');
const Movie     = require('./movie');

module.exports = Bookshelf.Collection.extend({
  model: Movie
});
