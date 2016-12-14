'use strict';

const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(req, res) {
  // console.log('req=================\r\n', req);
  // console.log('res=================\r\n', res);
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello from my server!');
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
