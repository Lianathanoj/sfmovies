'use strict';

const Controller        = require('./controller');
const LocationValidator = require('../../../validators/location/create');

exports.register = (server, options, next) => {
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

  next();

};

exports.register.attributes = {
  name: 'locations'
};
