'use strict';

const Bluebird = require('bluebird');

const Knex     = require('../../../../lib/libraries/knex');
const Server   = require('../../../../lib/server');
const Location = require('../../../../lib/models/location');
const Movie    = require('../../../../lib/models/movie');

describe('locations integration', () => {

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
        url: `/locations/${locationId}/movies/${movieId}`,
        method: 'POST'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

  describe('getMoviesFromLocation', () => {

    it('retrieves all movies from a location', () => {
      return Server.inject({
        url: `/locations/${locationId}/movies`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
      });
    });

  });

});
