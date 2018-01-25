'use strict';

const Bluebird = require('bluebird');

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');

exports.create = (payload) => {
  if (payload.title) {
    payload.name = payload.title;
    Reflect.deleteProperty(payload, 'title');
  }

  return new Movie().save(payload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.allocateLocation = (movieId, locationId) => {
  return Bluebird.all([
    new Movie().where('id', movieId).fetch(),
    new Location().where('id', locationId).fetch()
  ])
  .spread((movie, location) => {
    return movie.related('locations').attach(location)
    .then(() => new Movie().where('id', movieId).fetch({ withRelated: ['locations'] }));
  });
};

exports.getLocationsFromMovie = (movieId) => {
  return new Movie().where('id', movieId).fetch({ withRelated: ['locations'] })
  .then((movie) => movie.related('locations'));
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
