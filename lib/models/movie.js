'use strict';

const Bookshelf = require('../libraries/bookshelf');

const Movie = Bookshelf.Model.extend({
  tableName: 'movies',
  locations: function () {
    return this.belongsToMany('Location');
  },
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('title') || this.get('name'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  }
});

module.exports = Bookshelf.model('Movie', Movie);
