'use strict';

const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end('hello from my server!');
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text !== undefined) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end(cowsay.say({ text: req.url.query.text.trim()}));
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text === undefined) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    return res.end(cowsay.say({ text: 'bad request' }));
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if(err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        return res.end(cowsay.say({ text: 'bad request' }));
      }
      if(!err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({ text: req.body.text}));
      }
    });
    return;
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
