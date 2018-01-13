'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {

      const movie = Movie.forge().serialize();
      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });

    it('has a title field with a name input', () => {

      const titleField = 'title';
      const movie = Movie.forge({ name: titleField }).serialize();
      expect(movie.title).to.eql(titleField);
    });

  });

});
