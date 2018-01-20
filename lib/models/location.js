'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'locations',
  movies: function () {
    return this.belongsToMany(Movie);
  },
  serialize: function () {
    return {
      id: this.get('id'),
      name: this.get('name'),
      object: 'location'
    };
  }
});
