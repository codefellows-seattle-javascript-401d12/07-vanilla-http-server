'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring'); //parses query strings
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 2001;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query, true);
  var cow = req.url.query.cow ? req.url.query.cow : 'bong';

  console.log('request received, method:', req.method, 'animal:', cow);

  if (req.url.pathname === '/cowsay') {
    res.setHeader('Content-Type', 'text/plain');

    if (req.method === 'POST') {
      parseBody(req, function(err) {
        if(err) console.log('parseBody error:', err);
        if (req.body.text) {
          res.statusCode = 200;
          res.write(cowsay.say({text: req.body.text, f:cow}));
        }
        else {
          res.statusCode = 400;
          res.write(cowsay.say({text: 'You made a moooooostake'}));
        }
        res.end();
      });
    }

    if (req.method === 'GET') {
      if(req.url.query.text) {
        res.statusCode = 200;
        res.write(cowsay.say({text: req.url.query.text, f:cow}));
        res.end();
      }
      else {
        res.statusCode = 400;
        res.write(cowsay.say({text: 'I\'m a cow, not a mind reader.'}));
        res.end();
      }
    }
  }

  if (req.url.pathname === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.write('hello from my server!');
    res.end();
  }
});

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
