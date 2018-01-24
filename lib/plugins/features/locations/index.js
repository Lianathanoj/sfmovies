'use strict';

const Controller        = require('./controller');
const LocationValidator = require('../../../validators/location/create');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/locations/{id}/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.getMoviesFromLocation(request.params.id));
        }
      }
    },
    {
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
    },
    {
      method: 'POST',
      path: '/locations/{location_id}/movies/{movie_id}',
      config: {
        handler: (request, reply) => {
          reply(Controller.allocateMovie(request.params.movie_id, request.params.location_id));
        }
      }
    }
  ]);

  next();

};

exports.register.attributes = {
  name: 'locations'
};
