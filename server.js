'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  // TODO: BUILD OUT REST OF SERVER

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log('get request to cowsay');
    res.write(cowsay.say({text: 'hello from cowville'}));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}.`);
});
