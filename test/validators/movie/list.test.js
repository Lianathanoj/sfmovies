'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../../lib/validators/movie/list');

describe('movie-list validator', () => {

  describe('release_year', () => {

    it('cannot appear with start_year', () => {
      const params = { release_year: 1955, start_year: 2015 };
      const result = Joi.validate(params, MovieListValidator);

      expect(result.error.details[0].type).to.eql('object.without');
      expect(result.error.details[0].context.main).to.eql('release_year');
      expect(result.error.details[0].context.peer).to.eql('start_year');
    });

    it('cannot appear with end_year', () => {
      const params = { release_year: 1955, end_year: 2015 };
      const result = Joi.validate(params, MovieListValidator);

      expect(result.error.details[0].type).to.eql('object.without');
      expect(result.error.details[0].context.main).to.eql('release_year');
      expect(result.error.details[0].context.peer).to.eql('end_year');
    });

    it('cannot appear with start_year and end_year', () => {
      const params = { release_year: 1955, start_year: 2015, end_year: 2019 };
      const result = Joi.validate(params, MovieListValidator);

      expect(result.error.details[0].type).to.eql('object.without');
      expect(result.error.details[0].context.main).to.eql('release_year');
      expect(result.error.details[0].context.peer).to.eql('start_year');
    });

  });

  describe('title', () => {

    it('cannot appear with fuzzy_title', () => {
      const params = { title: 'Aladdin', fuzzy_title: 'Ala' };
      const result = Joi.validate(params, MovieListValidator);

      expect(result.error.details[0].type).to.eql('object.without');
      expect(result.error.details[0].context.main).to.eql('title');
      expect(result.error.details[0].context.peer).to.eql('fuzzy_title');
    });

  });

});
