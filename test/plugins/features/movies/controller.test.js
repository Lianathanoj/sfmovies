'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie with title attribute', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.name);
        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.name);
      });
    });

    it('creates a movie with name attribute', () => {
      const payload = { name: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.name);
        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.name);
      });
    });

  });

  describe('get endpoint', () => {

    it('retrieves all movies', () => {
      let length;

      return Controller.getAll()
      .then((movies) => {
        length = movies.length;
        return new Movie().fetchAll();
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

    it('retrieves all movies with release year', () => {
      const releaseYear = 1947;
      const payload = { release_year: releaseYear, title: 'WAll-E' };
      let length;

      return new Movie().save(payload)
      .then(() => {
        return new Movie().query((qb) => {
          qb.where('release_year', releaseYear);
        }).fetchAll();
      })
      .then((movies) => {
        length = movies.length;
        return Controller.getAll({ release_year: releaseYear });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

  });

});
