'use strict';

const Server = require('../../../../lib/server');

describe('locations integration', () => {

  describe('create', () => {

    it('creates a location', () => {
      return Server.inject({
        url: '/locations',
        method: 'POST',
        payload: { name: 'San Jose' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('location');
      });
    });

  });

});
