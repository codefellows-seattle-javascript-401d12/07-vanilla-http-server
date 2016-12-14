'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody (req, function(err) {
      console.log('POST request body:', req.body);
      if(err) console.error(err);
      try {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text}));
      } catch(err){
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request'}));
      }
      res.end();
    });
    return;
  }

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello from my server!');
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query) {
    if(req.url.query.text ==='dragon') {
      res.write(cowsay.say({f: 'dragon', text: 'OH SHOOT...DRAAAAAAGON!!'}));
      res.end();
    } else{
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: req.url.query.text}));
      res.end();
    }
  }
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: 'bad request'}));
  }
  res.end();
  return;
});

server.listen(PORT, () => {
  console.log('Server running on PORT:', PORT);
});
