'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parser.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(request, response) {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);

  if (request.url.pathname === '/') {
    response.writeHead(200, 'Hello from my server!', {'Content-Type': 'text/plain'});
    response.end();
    return;
  }

  if (request.url.pathname === '/cowsay') {
    const contentType = {'Content-Type': 'text/plain'};
    if (request.method === 'GET') {
      if (request.url.query.text) {
        response.writeHead(200, contentType);
        response.write(cowsay.say({text: request.url.query.text}));
        response.end();
        return;
      }
      response.writeHead(400, contentType);
      response.write(cowsay.say({text: 'Bad request'}));
      response.end();
      return;
    }

    if (request.method === 'POST') {
      parseBody(request, function(err) {
        if (err) return console.error(err);
        if (request.body.text) {
          response.writeHead(200, contentType);
          response.write(cowsay.say({text: request.body.text}));
          response.end();
          return;
        }
        response.writeHead(400, contentType);
        response.write(cowsay.say({text: 'Bad request'}));
        response.end();
        return;
      });
    }
  }
});

server.listen(PORT, function() {
  console.log('Server started on port', PORT);
});
