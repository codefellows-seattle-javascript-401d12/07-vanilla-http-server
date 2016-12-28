'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const response = require('./lib/response.js');
const PORT = 3000;


const server = http.createServer(function(req,res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);


  if(req.url.path === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello from my server!');
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    response(req.url.query, res);
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    response(req.url.query, res);
    res.end();
  }
});
server.listen(PORT, () => {
  console.log('Hello http server');
});
