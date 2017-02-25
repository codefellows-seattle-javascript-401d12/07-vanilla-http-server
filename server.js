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

  // REQUESTS TO ROOT URL
  if (req.method === 'POST' && req.url.pathname === '/') {
    console.log('successful request to home');
    res.writeHead(200,
      {
        'Content-Type': 'text/plain',
      }
    );
    res.write('hello from my server!');
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/') {
    console.log('successful request to home');
    res.writeHead(200,
      {
        'Content-Type': 'text/plain',
      }
    );
    res.write('hello from my server!');
    res.end();
  }

  // REQUESTS TO COWSAY URL
  if (req.method === 'GET' && req.url.pathname === '/cowsay' && !req.url.query.text) {
    res.writeHead(200,
      {
        'Content-Type': 'text/plain',
      }
    );
    console.log('get request to cowsay');
    res.write(cowsay.say({text: 'hello from cowville'}));
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text) {
    res.writeHead(200,
      {
        'Content-Type': 'text/plain',
      }
    );
    res.write(cowsay.say({text: req.url.query.text}));
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay' && req.url.query.text) {
    parseBody(req, function(err) {
      console.log(`POST request body: ${req.url.query.text}`);
      res.writeHead(200,
        {
          'Content-Type': 'text/plain',
        }
      );
      res.write(cowsay.say({text: req.url.query.text}));
      res.end();
    });
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay' && !req.url.query.text) {
    parseBody(req, function(err) {
      res.writeHead(400);
      res.write(cowsay.say({text: 'BAD REQUEST.'}));
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}.`);
});
