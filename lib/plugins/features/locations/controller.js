'use strict';

const Location = require('../../../models/location');

exports.create = (payload) => {
  return new Location().save(payload)
  .then((location) => {
    return new Location({ id: location.id }).fetch();
  });
};
