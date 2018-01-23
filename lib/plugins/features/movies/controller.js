'use strict';

const Movie         = require('../../../models/movie');
const Location      = require('../../../models/location');
const MovieLocation = require('../../../models/location-movie');

exports.create = (payload) => {
  if (payload.title) {
    payload.name = payload.title;
    Reflect.deleteProperty(payload, 'title');
  }

  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.allocateLocation = (movieId, locationId) => {
  return new Movie().where('id', movieId).fetch()
  .then(() => {
    return new Location().where('id', locationId).fetch();
  }).then(() => {
    return new MovieLocation().save({ movie_id: movieId, location_id: locationId });
  });
};

exports.getLocationsFromMovie = (movieId) => {
  return new Movie().where('id', movieId).fetch({ withRelated: ['locations'] })
  .then((movie) => {
    return movie.related('locations');
  });
};

exports.getAll = (query) => {
  return new Movie().query((qb) => {
    query = query || {};

    if (query.title) {
      qb.where('name', query.title);
    } else if (query.fuzzy_title) {
      qb.where('name', 'LIKE', `%${query.fuzzy_title}%`);
    }

    if (query.release_year) {
      qb.where('release_year', query.release_year);
    } else {
      if (query.start_year) {
        qb.where('release_year', '>=', query.start_year);
      }

      if (query.end_year) {
        qb.where('release_year', '<=', query.end_year);
      }
    }

  }).fetchAll();
};
