'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 5555;

const router = require('./model/router.js');

router.add('GET', '/', function(req, res) {
  res.write('hello from my server!\n');
  res.end();
});

router.add('GET', '/cowsay', function(req, res) {
  console.log('GET /cowsay');
  let q = req.url.query.text;
  let msg = (q && q.length > 0) ? q : 'text=Tell me what to say';
  // res.write('You are trying to GET to /cowsay...\n');
  msg = cowsay.say({
    text: msg,
    f: 'dragon',
    e: '--',
    T: 'Y'
  });
  res.write(msg + '\n');
  res.end();
});

router.add('POST', '/cowsay', function(req, res) {
  console.log('POST /cowsay');
  res.write('You are trying to POST to /cowsay...\n');
  res.end();
});

//TODO: Q: Should we start using (req, res) => ?
const server = http.createServer(function(req, res) {
  //Convert the url into an object.
  req.url = url.parse(req.url);
  //Decode the query string
  req.url.query = querystring.parse(req.url.query);

  console.log(req.url);

  var handler = router.find(req.method, req.url.pathname);
  if(handler) return handler(req, res);

  res.write('This should be a 404. Route not found.\n');
  res.end();
});

server.listen(PORT, () => {
  console.log('cowsay server up', PORT);
});
