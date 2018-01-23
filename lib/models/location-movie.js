'use strict';

const Bookshelf = require('../libraries/bookshelf');

const LocationMovie = Bookshelf.Model.extend({
  tableName: 'locations_movies',
  serialize: function () {
    return {
      id: this.get('id'),
      movieId: this.get('title') || this.get('name'),
      locationId: this.get('release_year'),
      object: 'location_movie'
    };
  }
});

module.exports = Bookshelf.model('LocationMovie', LocationMovie);
