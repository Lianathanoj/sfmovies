'use strict';

const Bluebird = require('bluebird');

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');

exports.create = (payload) => {
  return new Location().save(payload)
  .then((location) => new Location({ id: location.id }).fetch());
};

exports.allocateMovie = (movieId, locationId) => {
  return Bluebird.all([
    new Movie().where('id', movieId).fetch(),
    new Location().where('id', locationId).fetch()
  ])
  .spread((movie, location) => {
    return movie.related('locations').attach(location)
    .then(() => new Location().where('id', locationId).fetch({ withRelated: ['movies'] }));
  });
};

exports.getMoviesFromLocation = (locationId) => {
  return new Location().where('id', locationId).fetch({ withRelated: ['movies'] })
  .then((location) => location.related('movies'));
};
