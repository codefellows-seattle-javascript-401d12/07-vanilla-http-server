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

  // console.log('req url:', req.url);
  // console.log('req querystring:', req.url.query);
  //
  // console.log('request method:', req.method);

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    // console.log('you have made a request!');
    res.write(cowsay.say({text: 'hey erick'}));
    res.end();
  }
  res.end();
});

server.listen(PORT, () => {
  console.log('server running:', PORT);
});
