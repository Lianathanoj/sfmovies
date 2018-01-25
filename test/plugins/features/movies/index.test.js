'use strict';

const Bluebird = require('bluebird');

const Knex     = require('../../../../lib/libraries/knex');
const Server   = require('../../../../lib/server');
const Location = require('../../../../lib/models/location');
const Movie    = require('../../../../lib/models/movie');

describe('movies integration', () => {

  let locationId;
  let movieId;

  before(() => {
    return Bluebird.all([
      Knex.raw('TRUNCATE locations_movies CASCADE'),
      Knex.raw('TRUNCATE locations CASCADE'),
      Knex.raw('TRUNCATE movies CASCADE')
    ]).then(() => {
      return Bluebird.all([
        new Movie().save({ name: 'Aladdin' }),
        new Location().save({ name: 'San Francisco' })
      ])
      .spread((movie, location) => {
        movieId = movie.id;
        locationId = location.id;
      });
    });
  });

  describe('create', () => {

    it('creates a movie', () => {
      return Server.inject({
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

  describe('allocateMovie', () => {

    it('allocates a location to movie', () => {
      return Server.inject({
        url: `/movies/${movieId}/locations/${locationId}`,
        method: 'POST'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

  describe('get endpoint', () => {

    it('retrieves all movies', () => {
      return Server.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with release date', () => {
      return Server.inject({
        url: '/movies',
        method: 'GET',
        headers: { release_date: 1947 }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies within year range', () => {
      return Server.inject({
        url: '/movies',
        method: 'GET',
        headers: { start_year: 1947, end_year: 2015 }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with title', () => {
      return Server.inject({
        url: '/movies',
        method: 'GET',
        headers: { title: 'Aladdin' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all movies with fuzzy title', () => {
      return Server.inject({
        url: '/movies',
        method: 'GET',
        headers: { fuzzy_title: 'Aladdin' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

    it('retrieves all locations from a movie', () => {
      return Server.inject({
        url: `/movies/${movieId}/locations`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
