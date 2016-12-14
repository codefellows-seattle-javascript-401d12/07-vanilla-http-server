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

  if (req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('hello from my server');
    return res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    try {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say(req.url.query));
    } catch (err) {
      res.writeHead(400);
      res.write(cowsay.think({
        text: 'Bad Request. Ren is sad. You could try: http localhost:3000/cowsay?text=hi',
        f: 'ren'
      }));
    }
    return res.end();
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      if(req.body.text) {
        try {
          res.writeHead(200,{
            'Content-Type': 'text/plain'
          });
          res.write(cowsay.say({
            text: req.body.text
          }));
          return res.end();
        } catch (err) {
          res.writeHead(400);
          res.write(cowsay.think({
            text: 'Bad Request. Daemon is happy. Try again.',
            f: 'daemon'
          }));
          return res.end();
        }
      }
      return res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log('server is up:', PORT);
});
