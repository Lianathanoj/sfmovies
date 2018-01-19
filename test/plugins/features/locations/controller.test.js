'use strict';

const Controller = require('../../../../lib/plugins/features/locations/controller');
const Location   = require('../../../../lib/models/location');

describe('location controller', () => {

  describe('create', () => {

    it('creates a location', () => {
      const payload = { name: 'San Francisco' };

      return Controller.create(payload)
      .then((location) => {
        expect(location.get('name')).to.eql(payload.name);
        return new Location({ id: location.id }).fetch();
      })
      .then((location) => {
        expect(location.get('name')).to.eql(payload.name);
      });
    });

  });

});
