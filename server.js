'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, response) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // console.log('req url:', request.url); //returns url object
  // console.log('req querystring:', request.url.query); //returns empty object
  // console.log(request.method); //returns GET method

  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) console.log(err);
      console.log('POST request body:', req.body);
    });
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    response.write(cowsay.say({text: 'the cow says hello'}));
    response.end();
  }
  response.end();
});

server.listen(PORT, function() {
  console.log('server live on:', PORT);
});
