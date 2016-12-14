'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parser.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(request, response) {

});

server.listen(PORT, function() {
  console.log('Server started on port', PORT);
});
