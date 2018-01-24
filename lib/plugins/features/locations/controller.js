'use strict';

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');

exports.create = (payload) => {
  return new Location().save(payload)
  .then((location) => new Location({ id: location.id }).fetch());
};

exports.allocateMovie = (movieId, locationId) => {
  let movie;

  return new Movie().where('id', movieId).fetch()
  .then((res) => {
    movie = res;

    return new Location().where('id', locationId).fetch();
  })
  .then((location) => movie.related('locations').attach(location))
  .then(() => new Location().where('id', locationId).fetch({ withRelated: ['movies'] }));
};

exports.getMoviesFromLocation = (locationId) => {
  return new Location().where('id', locationId).fetch({ withRelated: ['movies'] })
  .then((location) => location.related('movies'));
};
