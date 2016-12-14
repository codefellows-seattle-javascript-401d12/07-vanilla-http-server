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
      res.write(cowsay.say({
        text: 'Bad Request. Ren is sad. You could try: http localhost:3000/cowsay?text=hi',
        f: 'ren'
      }));
      return res.end();
    }
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    if (req.body || req.body.text) {
      try {
        parseBody(req, function(err, body) {
          if(err) console.error(err);
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.write(cowsay.say(body));
          console.log('POST request body:', req.body);
          res.end();
        });
        return;
      } catch (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({
          text: 'Bad Request. Daemon is happy. You could try: http POST localhost:3000?text=hello',
          f: 'daemon'
        }));
        return res.end();
      }
    }
  }
});

server.listen(PORT, () => {
  console.log('server is up:', PORT);
});
