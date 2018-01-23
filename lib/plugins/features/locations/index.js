'use strict';

const Controller        = require('./controller');
const LocationValidator = require('../../../validators/location/create');

exports.register = (server, options, next) => {
  server.route([{
    method: 'GET',
    path: '/locations/{location_id}/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.getMoviesFromLocation(request.params.location_id));
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: LocationValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/locations/{location_id}/movies/{movie_id}',
    config: {
      handler: (request, reply) => {
        reply(Controller.allocateMovie(request.params.movie_id, request.params.location_id));
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'locations'
};
