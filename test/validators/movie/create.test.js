'use strict';

const Joi = require('joi');

const MovieValidator = require('../../../lib/validators/movie/create');

describe('movie-create validator', () => {

  describe('title and name', () => {

    it('has one or the other', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].context.peers).to.contain.members(['title', 'name']);
      expect(result.error.details[0].type).to.eql('object.missing');
    });

    it('are not set at the same time', () => {
      const payload = {
        title: 'WALL-E',
        name: 'WALL-E'
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].context.peers).to.contain.members(['title', 'name']);
      expect(result.error.details[0].type).to.eql('object.xor');
    });

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        title: 'foo',
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year: 12345
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
