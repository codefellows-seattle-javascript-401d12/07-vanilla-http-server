'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(request, response) {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);

  console.log('req url:', request.url);
  console.log('req querystring:', request.url.query);
  console.log(request.method);

  if(request.method === 'POST') {
    parseBody(request, function(err) {
      if (err) console.log(err);
      console.log('POST request body:', request.body);
    });
  }
  response.end();
});

server.listen(PORT, function() {
  console.log('server live on:', PORT);
});
