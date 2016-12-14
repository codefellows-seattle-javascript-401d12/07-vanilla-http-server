'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 5555;

const router = require('./model/router.js');

router.add('GET', '/', function(req, res) {
  res.write('hey there. This is the base path.\n');
  res.end();
});

//TODO: Q: Should we start using (req, res) => ?
const server = http.createServer(function(req, res) {
  //Convert the url into an object.
  req.url = url.parse(req.url);
  //Decode the query string
  req.url.query = querystring.parse(req.url.query);

  //TODO: see if we have a handler for method && path
  // We can let the router try to handle the request.
  // If it can't find a route, callback('no route found')
  // If route is found, eventually callback(null, ???)
  var handler = router.find(req.method, req.url.path);

  if(handler) return handler(req, res);

  res.write('This should be a 404. Route not found.\n');
  res.end();
});

server.listen(PORT, () => {
  console.log('cowsay server up', PORT);
});
