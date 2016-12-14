'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parser.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(request, response) {
  const contentType = {'Content-Type': 'text/plain'};
  const badRequest = function() {
    response.writeHead(400, contentType);
    response.write(cowsay.say({text: 'Bad request.'}));
    response.end();
  };

  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);

  if (request.url.pathname === '/') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello from my server!');
    response.end();
    return;
  }

  if (request.url.pathname === '/cowsay') {
    if (request.method === 'GET') {
      var cowType = request.url.query.cow;
      if (!cowType) cowType = 'default';
      cowsay.list(function(err, cowArray) {
        if (cowArray.indexOf(cowType) === -1) cowType = 'default';
        if (request.url.query.text) {
          response.writeHead(200, contentType);
          response.write(cowsay.say({text: request.url.query.text, f: cowType}));
          response.end();
          return;
        }
        badRequest();
        return;
      });
    }

    if (request.method === 'POST') {
      parseBody(request, function(err) {
        if (err) {
          badRequest();
          return console.error(err);
        }
        var cowType = request.body.cow;
        if (!cowType) cowType = 'default';
        cowsay.list(function(err, cowArray) {
          if (cowArray.indexOf(cowType) === -1) cowType = 'default';
          if (request.body.text) {
            response.writeHead(200, contentType);
            response.write(cowsay.say({text: request.body.text, f: cowType}));
            response.end();
            return;
          }
          badRequest();
          return;
        });
      });
    }
  }
});

server.listen(PORT, function() {
  console.log('Server started on port', PORT);
});
