'use strict';

function Router() {
  this.routes = [];
}

Router.prototype.add = function(method, path, handler) {
  var found = this.routes.find(function(route) {
    //TODO: Add support for regex and/or glob specs
    return (route.method == method && route.path == path);
  });
  if(found) {
    //TODO: make a test that sets a route more than once
    //Update existing route's handler.
    found.handler = handler;
    return found;
  }
  this.routes.push({
    method: method,
    path: path,
    handler: handler
  });
};

Router.prototype.find = function(method, path) {
  var found = this.routes.find(function(route) {
    return (route.method == method && route.path == path);
  });
  if(found) return found.handler;
};

Router.prototype.handle = function(req, res, next) {
  var handler = this.find(req.method, req.url.pathname);
  if(handler) return handler(req, res);

  if(next) return next(req, res);

  //Without a next handler, what can we do?
  res.err({ status: 404, statusMessage: 'route not found'});
};

module.exports = exports = {};
exports.Router = Router;

//TODO: implement Array.prototype.find to see if I can match functionality
