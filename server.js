'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parsBody = require('./lib/parse-body.js');
const PORT = 3000;


const server = http.createServer(function(req,res){
 console.log('http server created');
 req.url = url.parse(req.url);
 req.url.query = querystring.parse(req.url.query);
});

server.listen(PORT, () => {
 console.log('Hello http server');
});
