'use strict';

const Movie = require('../../../models/movie');

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
