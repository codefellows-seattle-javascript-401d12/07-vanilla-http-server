'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 5555;

const router = require('./model/router.js');
const parseBody = require('./lib/parse-body.js');

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
  //For now, I'm just going to pass the body to cowsay
  if(!req.body || !req.body.text || req.body.text.length <= 0) {
    console.log('body is missing "text"');
    return handleErr('Cannot find valid "text" param in POST body', req, res);

    //TODO: handleErr(options -> { status, statusMessage })
  }

  let msg = cowsay.say(req.body);
  console.log('about to send:', msg);
  res.write(msg + '\n');
  res.end();
  console.log('...done sending');
});

//TODO: Q: Should we start using (req, res) => ?
const server = http.createServer(function(req, res) {
  //Convert the url into an object.
  req.url = url.parse(req.url);
  //Decode the query string
  req.url.query = querystring.parse(req.url.query);

  console.log(req.url);

  if(req.method === 'POST') {
    console.log('parsing body...');
    return parseBody(req, (err, body) => {
      if(err) return handleErr(err, req, res);
      console.log('parsed body:',body);
      handleRoute(req, res);
    });
  }
  //On non-POST reqs, we still use handleRoute.
  handleRoute(req, res);
});

function handleRoute(req, res) {
  var handler = router.find(req.method, req.url.pathname);
  if(handler) return handler(req, res);

  res.write('This should be a 404. Route not found.\n');
  res.end();
}

//TODO: Q: Do I need req? What might we do with that?
function handleErr(err, req, res) {
  console.log('handleErr:',err);
  // console.log(res);
  res.write(`Error: ${err}\n`);
  res.end();
  console.log('...wrote err msg');
}

server.listen(PORT, () => {
  console.log('cowsay server up', PORT);
});
