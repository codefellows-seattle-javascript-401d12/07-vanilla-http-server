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
  // var contentType = {'Content-Type': 'text/plain'};
  if ('/' === req.url.pathname) {
    // res.writeHead( cowsay.say(200, contentType));
    res.write('Hello peeps!');
    res.end();
    return;
  }
  // if (req.url.pathname === '/cowsay') {
  //   // res.writeHead( 200, {'Content-Type': 'text/plain'});
  //   res.write(cowsay.say({ text: 'hello from cowsay!!' }));
  //   res.end();
  //   return;
  // }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
//  if (req.url.query.write({text: 'helloWorld'})); {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: 'hello from cowville' }));
    res.end();
    return;
  }
    //   * if the query `text=message` is **not** set, respond with:
    //     * status code = 400
    //     * a body including the value returned from `cowsay.say({ text: 'bad request' })`
  // if ( req.body !== {text: 'Hello request body!'} ) {
  //   res.writeHead(400, {'Content-Type': 'text/plain'});
  //   res.write(cowsay.say ({ text: 'very bad request'}));
  //   res.end();
  //   return;
  // }
  //
  // // TODO: '&&' or '||'??
  // if (req.method === 'POST' && req.url.pathname === '/cowsay') {
  //   parseBody(req, function(err) {
  //     if (err) return console.error(err);
  //     console.log('POST request body:', req.body);
  //   });
  // }
    // For all **POST** requests made to `/cowsay`, the server should respond with the following:
    //   * the response header should include `Content-Type: text/plain`
    //   * if the JSON `{text: messsage}` is set in the body, respond with:
    //     * a status code of 200
    //     * a response body including the value returned from `cowsay.say({ text: <querystring text> })` TODO???
  if (req.method === 'POST'){
    if (req.url.pathname === '/cowsay') {
      res.write(cowsay.say({ text: 'hello from the amazing cowsay.' }));
      res.end();
      return;
    }
    // if ( req.body === {text: 'Hello request body!'} ) {
    //   res.writeHead(200, {'Content-Type': 'text/plain'} );
    //   res.write(cowsay.say({ text: req.url.query.text }));
    //   res.end();
    // }
  }
  //   * if the JSON `{text: messsage}` is **not** set in the body, respond with:
  //       * a status code of 400
  //       * a body including the value returned from `cowsay.say({ text: 'bad request' })`
  if (req.body !== {text: 'Hello request body!'}) {
    res.writeHead(400);
    res.write(cowsay.say({ text: 'Horribly bad request' }));
    res.end();
  }

  res.end();
});

server.listen(PORT, function() {
  console.log( `Server on: ${PORT}` );
});
