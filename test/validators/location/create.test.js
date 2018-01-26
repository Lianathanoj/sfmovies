'use strict';

const Joi = require('joi');

const LocationValidator = require('../../../lib/validators/location/create');

describe('location-create validator', () => {

  describe('name', () => {

    it('is is greater than 0 characters', () => {
      const payload = { name: '' };
      const result = Joi.validate(payload, LocationValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

    it('is less than 255 characters', () => {
      const payload = { name: 'a'.repeat(260) };
      const result = Joi.validate(payload, LocationValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

});
