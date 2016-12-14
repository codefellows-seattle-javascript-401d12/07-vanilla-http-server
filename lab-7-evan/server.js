'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParser = require('./lib/body-parser.js');
const PORT = 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // GETS --------------------------------------------
  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello from my server!');
    res.end();
  };

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.write(cowsay.say({ text: 'Hello from all of us in Cowville!'}));
    res.end();
  };

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    if(req.url.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({ text: req.url.query.text }));
      res.end();
    }
  };

  // if(req.method === 'GET' && req.url.pathname === '/cowsay') {
  //   if(!req.url.query.text) {
  //     res.writeHead(400, {'Content-Type': 'text/plain'});
  //     res.write(cowsay.say({ text: '400 bad request'}));
  //     res.end();
  //   }
  // };

  if(req.method === 'GET' && req.url.pathname === '/dragon') {
    res.write(cowsay.say({f: 'dragon', text: '400 bad request'}));
    res.end();
  };

  if(req.method === 'GET' && req.url.pathname === '/ghostbusters') {
    res.write(cowsay.say({f: 'ghostbusters', text: '400 bad request'}));
    res.end();
  };

  // // POSTS---------------------------------------------
  // if(req.method === 'POST') {
  //   bodyParser(req, function(err) {
  //     if(err) console.error(err);
  //     console.log('POST request body:', req.body);
  //     res.end();
  //   });
  // };
  //
  // if(req.method === 'POST' && req.url.pathname === '/cowsay') {
  //   let contentType = {'Content-Type': 'text/plain'};
  //
  // }

});

server.listen(PORT, () => {
  console.log(`Your server is running on ${PORT}`);
});
