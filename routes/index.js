'use strict';
module.exports = function attachRoutes(server) {
  require('./pingRoute')(server);
  require('./seorRoute')(server);
};
