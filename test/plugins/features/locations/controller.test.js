'use strict';

const MovieController    = require('../../../../lib/plugins/features/movies/controller');
const LocationController = require('../../../../lib/plugins/features/locations/controller');
const Location           = require('../../../../lib/models/location');
const MovieLocation      = require('../../../../lib/models/location-movie');

describe('location controller', () => {

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
      const moviePayload = { title: 'Aladdin' };
      const locationPayload = { name: 'San Francisco' };
      const movieId = 1;
      const locationId = 1;

      MovieController.create(moviePayload);
      LocationController.create(locationPayload);

      return LocationController.allocateMovie(movieId, locationId)
      .then((movieLocation) => {
        expect(movieLocation.get('movie_id')).to.eql(movieId);
        expect(movieLocation.get('location_id')).to.eql(locationId);
        return new MovieLocation({ id: movieLocation.id }).fetch();
      })
      .then((movieLocation) => {
        expect(movieLocation.get('movie_id')).to.eql(movieId);
        expect(movieLocation.get('location_id')).to.eql(locationId);
      });
    });

  });

  describe('getMoviesFromLocation', () => {

    it('retrieves all movies from a location', () => {
      const locationId = 1;
      let length;

      return LocationController.getMoviesFromLocation(locationId)
      .then((movies) => {
        length = movies.length;

        return new Location().where('id', locationId).fetch({ withRelated: ['movies'] })
        .then((location) => {
          return location.related('movies');
        });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

  });

});
