'use strict';

const cockroach = require('./lib/cockroach');

module.exports = app => {
  if (app.config.cockroach.app) {
    return cockroach(app);
  }
};
