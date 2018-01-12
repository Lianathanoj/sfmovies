'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    const titleField = 'title';

    it('includes all of the necessary fields with name field', () => {

      const movie = Movie.forge().serialize({ name: titleField });

      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });

    it('includes all of the necessary fields with title field', () => {

      const movie = Movie.forge().serialize({ title: titleField });

      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });

  });

});
