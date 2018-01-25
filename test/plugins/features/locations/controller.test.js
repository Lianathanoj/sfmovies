'use strict';

const Bluebird = require('bluebird');

const Knex               = require('../../../../lib/libraries/knex');
const LocationController = require('../../../../lib/plugins/features/locations/controller');
const Location           = require('../../../../lib/models/location');
const Movie              = require('../../../../lib/models/movie');

describe('location controller', () => {

  let movieId;
  let locationId;

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
      const payload = { name: 'San Francisco' };

      return LocationController.create(payload)
      .then((location) => {
        expect(location.get('name')).to.eql(payload.name);
        return new Location({ id: location.id }).fetch();
      })
      .then((location) => {
        expect(location.get('name')).to.eql(payload.name);
      });
    });

  });

  describe('allocateMovie', () => {

    it('allocates movie to location', () => {
      return LocationController.allocateMovie(movieId, locationId)
      .then((location) => {
        expect(location.id).to.eql(locationId);
      });
    });

  });

  describe('getMoviesFromLocation', () => {

    it('retrieves all movies from a location', () => {
      return Bluebird.all([
        LocationController.getMoviesFromLocation(locationId),
        new Location().where('id', locationId).fetch({ withRelated: ['movies'] })
      ]).spread((movies, location) => {
        const moviesFromLocation = location.related('movies');
        expect(movies.length).to.eql(moviesFromLocation.length);
      });
    });

  });

});
