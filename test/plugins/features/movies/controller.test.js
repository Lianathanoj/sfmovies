'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');
const Movies     = require('../../../../lib/models/movies');

describe('movie controller', () => {

  const title = 'Aladdin';
  const similarTitle = title.substr(parseInt(title.length / 2));
  const releaseYear = 1947;
  const startYear = 2014;
  const endYear = startYear + 10;

  before(() => {
    const movies = Movies.forge([
      { name: 'WALL-E', release_year: releaseYear },
      { name: title, release_year: 1992 },
      { name: 'Random Movie', release_year: startYear },
      { name: 'Something', release_year: 1975 },
      { name: 'Nothing', release_year: 2019 },
      { name: 'Whatever', release_year: releaseYear },
      { name: title, release_year: 1957 },
      { name: 'Wherever', release_year: endYear }
    ]);

    movies.invokeThen('save');
  });

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

      return new Movie().fetchAll()
      .then((movies) => {
        length = movies.length;

        return Controller.getAll();
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

    it('retrieves all movies with release year', () => {
      let length;

      return new Movie().query((qb) => {
        qb.where('release_year', releaseYear);
      }).fetchAll()
      .then((movies) => {
        length = movies.length;
        return Controller.getAll({ release_year: releaseYear });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

    it('retrieves all movies within year range', () => {
      let length;

      return new Movie().query((qb) => {
        qb.where('release_year', '>=', startYear).andWhere('release_year', '<=', endYear);
      }).fetchAll()
      .then((movies) => {
        length = movies.length;
        return Controller.getAll({ start_year: startYear, end_year: endYear });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

    it('retrieves all movies with title', () => {
      let length;

      return new Movie().query((qb) => {
        qb.where('name', title);
      }).fetchAll()
      .then((movies) => {
        length = movies.length;
        return Controller.getAll({ title });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

    it('retrieves all movies with fuzzy title', () => {
      let length;

      return new Movie().query((qb) => {
        qb.where('name', 'LIKE', `%${similarTitle}%`);
      }).fetchAll()
      .then((movies) => {
        length = movies.length;
        return Controller.getAll({ fuzzy_title: title });
      })
      .then((movies) => {
        expect(movies.length).to.eql(length);
      });
    });

  });

});
