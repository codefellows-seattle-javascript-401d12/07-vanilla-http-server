'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parser.js');
const PORT = process.env.port || 3000;

const server = http.createServer(function(req,res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/'){
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: 'Hello from my server'}))
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    if(!req.url.query.text){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({f:'dragon',text: 'bad request'}));
      res.end();
    }else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f:'dragon', text: req.url.query.text}));
    res.end();
    }
  }
  if(req.method === 'POST' && req.url.pathname === '/cowsay' ){
    parseBody(req, function(err){
      if(err) console.error(err);
      res.writeHead(200, {
        'Content-Type':'text/plain'
      });
      res.write(cowsay.say({f: 'dragon', text: req.body.text}));
      res.end();
    });
  }

});

server.listen(PORT, () => {
  console.log(`Port: ${PORT} served up`);
});
