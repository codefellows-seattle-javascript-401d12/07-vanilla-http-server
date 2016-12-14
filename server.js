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

  // console.log('req url:', request.url); //returns url object
  // console.log('req querystring:', request.url.query); //returns empty object
  // console.log(request.method); //returns GET method

  if(request.method === 'POST') {
    parseBody(request, function(err) {
      if (err) console.log(err);
      console.log('POST request body:', request.body);
    });
  }
  if(request.url.pathname === '/') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('what up from my server');
  }

  if(request.method === 'GET' && request.url.pathname === '/cowsay' && request.url.query.text !== undefined) {
  // if(request.method === 'GET' && request.url.pathname === '/cowsay') {

    response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write(cowsay.say({text: 'the cow says hello'}));
    response.end(cowsay.say({text: request.url.query.text.trim()}));

  }
  if(request.method === 'GET' && request.url.pathname === '/cowsay' && request.url.query.text === undefined) {
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.end(cowsay.say({text: 'bad request'}));
  }

  response.end();
});

server.listen(PORT, function() {
  console.log('server live on:', PORT);
});
