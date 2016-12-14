'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) console.error(err);
      console.log('POST request body:', req.body);
      if(req.url.pathname === '/cowsay' && req.body.text !== undefined) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: req.body.text.trim()}));
      }
      if(req.url.pathname === '/cowsay' && req.body.text === undefined) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: 'bad request'}));
      }
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello from my server!');
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text !== undefined) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(cowsay.say({text: req.url.query.text.trim()}));
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end(cowsay.say({text: 'bad request'}));
  }
});

server.listen(PORT, () => {
  console.log('server running:', PORT);
});
