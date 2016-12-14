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

  //Logic: Method: GET
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

  //Logic: Method: POST
  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err){
      if (err) return console.error(err);
      if(req.body.text){
        res.writeHead(200,{
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text:req.body.text}));
        res.end();
        return;
      }
      res.writeHead(400,{'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request'}));
      res.end();
    });
  }
});

//**START SERVER**
server.listen(PORT, function() {
  console.log('server up:', PORT);
});
