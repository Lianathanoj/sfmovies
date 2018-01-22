'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('get endpoint', () => {

    it('retrieves all movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with release date', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        headers: { release_date: 1947 }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies within year range', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        headers: { start_year: 1947, end_year: 2015 }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with title', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        headers: { title: 'Aladdin' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with fuzzy title', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        headers: { fuzzy_title: 'Aladdin' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
