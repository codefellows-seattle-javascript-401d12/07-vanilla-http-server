'use strict';

module.exports = exports = {};

const routes = [];

exports.add = function(method, path, handler) {
  var found = routes.find(function(route) {
    return (route.method == method && route.path == path);
  });
  if(found) {
    //Update existing route's handler.
    found.handler = handler;
    return found;
  }
  //TODO: Is it worthwhile to make a Route constructor?
  routes.push({
    method: method,
    path: path,
    handler: handler
  });
};

exports.find = function(method, path) {
  var found = routes.find(function(route) {
    return (route.method == method && route.path == path);
  });
  if(found) return found.handler;
};

//TODO: Alternative impl for find
exports.find2 = function(method, path, callback) {
  routes.forEach(function(route) {
    if(route.method == method && route.path == path) {
      callback(route.handler);
    }
  });
};

//TODO: implement Array.prototype.find to see if I can match functionality
