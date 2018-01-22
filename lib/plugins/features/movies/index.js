'use strict';

const Controller         = require('./controller');
const MovieValidator     = require('../../../validators/movie-create');
const MovieListValidator = require('../../../validators/movie-list');

exports.register = (server, options, next) => {
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

  next();

};

exports.register.attributes = {
  name: 'movies'
};
