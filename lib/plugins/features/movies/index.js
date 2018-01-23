'use strict';

const Controller         = require('./controller');
const MovieValidator     = require('../../../validators/movie/create');
const MovieListValidator = require('../../../validators/movie/list');

exports.register = (server, options, next) => {
  server.route([{
    method: 'GET',
    path: '/movies/{movie_id}/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.getLocationsFromMovie(request.params.movie_id));
      }
    }
  }]);

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.getAll(request.query));
      },
      validate: {
        query: MovieListValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/movies/{movie_id}/locations/{location_id}',
    config: {
      handler: (request, reply) => {
        reply(Controller.allocateLocation(request.params.movie_id, request.params.location_id));
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
