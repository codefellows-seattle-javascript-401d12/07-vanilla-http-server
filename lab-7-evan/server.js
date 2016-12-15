'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const bodyParser = require('./lib/body-parser.js');
const PORT = process.env.PORT || 3000;


const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

 // GETS --------------------------------------------
  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('Hello from my server!');
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query) {
    if(req.url.query.text ==='ghostbusters') {
      res.write(cowsay.say({f: 'ghostbusters', text: 'Ba na na na Na Ghostbusters!!!'}));
      res.end();
    }
    if(req.url.query.text ==='ren') {
      res.write(cowsay.say({f: 'ren', text: 'STIMPY!!'}));
      res.end();
    }
    if(req.url.query.text ==='dragon') {
      res.write(cowsay.say({f: 'dragon', text: 'OH SHOOT...DRAAAAAAGON!!'}));
      res.end();
    }
    if(req.url.query.text ==='sheep') {
      res.write(cowsay.say({f: 'sheep', text: 'derpy sheep!!'}));
      res.end();
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({text: req.url.query.text}));
      res.end();
    }
    res.end();
  }
  else {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write(cowsay.say({text: 'bad request'}));
    res.end();
  }

  // POSTS---------------------------------------------
  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    bodyParser(req, function(err) {
      console.log('POST request body:', req.body);
      if(err) console.error(err);
      try {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        console.log(req.body.text);
        res.write(cowsay.say({text: req.body.text}));
      }
      catch(err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text: 'bad request'}));
      }
      res.end();
    });
    return;
  }
});
server.listen(PORT, () => {
  console.log(`Your server is running on ${PORT}`);
});
