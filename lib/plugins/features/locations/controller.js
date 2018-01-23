'use strict';

const Movie         = require('../../../models/movie');
const Location      = require('../../../models/location');
const MovieLocation = require('../../../models/location-movie');

exports.create = (payload) => {
  return new Location().save(payload)
  .then((location) => {
    return new Location({ id: location.id }).fetch();
  });
};

exports.allocateMovie = (movieId, locationId) => {
  return new Movie().where('id', movieId).fetch()
  .then(() => {
    return new Location().where('id', locationId).fetch();
  }).then(() => {
    return new MovieLocation().save({ movie_id: movieId, location_id: locationId });
  });
};

exports.getMoviesFromLocation = (locationId) => {
  return new Location().where('id', locationId).fetch({ withRelated: ['movies'] })
  .then((location) => {
    return location.related('movies');
  });
};
