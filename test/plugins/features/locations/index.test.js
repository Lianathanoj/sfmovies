'use strict';

const Server = require('../../../../lib/server');

describe('locations integration', () => {

  describe('create', () => {

    it('creates a location', () => {
      return Server.inject({
        url: '/locations',
        method: 'POST',
        payload: { name: 'San Jose' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('location');
      });
    });

  });

  describe('allocateMovie', () => {

    it('allocates a movie to location', () => {
      return Server.inject({
        url: '/locations/1/movies/1',
        method: 'POST'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('location');
      });
    });

  });

  describe('getMoviesFromLocation', () => {

    it('retrieves all movies from a location', () => {
      return Server.inject({
        url: '/locations/1/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
