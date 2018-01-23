'use strict';

const Bookshelf = require('../libraries/bookshelf');

const Location = Bookshelf.Model.extend({
  tableName: 'locations',
  movies: function () {
    return this.belongsToMany('Movie');
  },
  serialize: function () {
    return {
      id: this.get('id'),
      name: this.get('name'),
      object: 'location'
    };
  }
});

module.exports = Bookshelf.model('Location', Location);
