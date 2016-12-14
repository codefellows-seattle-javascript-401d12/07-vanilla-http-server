'use strict';

//**DEPENDENCIES**
//node modules
const http = require('http');
const url = require('url');
const queryString = require('querystring');
//npm modules
const cowsay = require('cowsay');
//custom modules
const parseBody = require('./lib/parse-body.js');
//environment variables
const PORT = process.env.PORT || 3000;

//**LOGIC**
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  //Logic: Method : GET
    if (req.method === 'GET') {
      if(req.url.pathname === '/') {
        res.writeHead( 200, {
          'Content-Type': 'text/plain'
        });
        res.write('Hello From The Server');
        res.end();
      }
      if (req.url.pathname === '/cowsay'){
        if (req.url.query.text) {
          res.writeHead(200);
          res.write(cowsay.say({text:req.url.query.text}));
          res.end();
          return;
        }
        res.writeHead(400);
        res.write(cowsay.say({text:'bad request'}));
        res.end();
      }
    }
