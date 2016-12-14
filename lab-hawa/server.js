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

  // * For all **GET** requests made to `/cowsay`, the server should respond with the following:
  if ( req.url.pathname === '/cowsay' && req.method === 'GET') {
    // the query string should have the key value `text=<message>`
    if (req.url.query.write({text: 'hello world'})); {
      //   * the response header should include `Content-Type: text/plain`
      //   * if the query `text=messsage` is set, respond with:
      //     * a status code of 200
      //     * a response body that includes the value returned from `cowsay.say({ text: <querystring text> })`
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({ text: req.url.query}));
      res.end();
    }
    //   * if the query `text=message` is **not** set, respond with:
    //     * status code = 400
    //     * a body including the value returned from `cowsay.say({ text: 'bad request' })`
    if ( req.url.query ) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say ({ text: 'bad request'}));
      res.end();
    }
  }


  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.writeHead( 200, {'Content-Type': 'text/plain'} );
    res.write(cowsay.say({ text: 'hello from cowsay.' }));
    res.end();
  }

  if ('/' === req.url.pathname) {
    res.writeHead( cowsay.say(200, {'Content-Type': 'text/plain'} ));
    res.write('Hello from my server!');
    res.end();
  }



  res.end();
});

server.listen(PORT, function() {
  console.log( `Server on: ${PORT}` );
});
