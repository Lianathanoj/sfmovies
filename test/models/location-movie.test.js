'use strict';

const LocationMovie = require('../../lib/models/location-movie');

describe('location_movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const locationMovie = LocationMovie.forge().serialize();

      expect(locationMovie).to.have.all.keys([
        'id',
        'movieId',
        'locationId',
        'object'
      ]);
    });

  });

});
