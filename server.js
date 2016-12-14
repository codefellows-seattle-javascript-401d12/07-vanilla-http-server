'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 5555;

const router = require('./router.js');
const parseBody = require('./lib/parse-body.js');

//TODO: Q: Should we start using (req, res) => ?
const server = http.createServer(function(req, res) {
  //Convert the url into an object.
  req.url = url.parse(req.url);
  //Decode the query string
  req.url.query = querystring.parse(req.url.query);

  console.log(req.url);

  //I'm attaching a couple of utility methods to res
  res.send = function(msg) {
    //set the headers, if any.
    //also get the status from the res.
    //TODO: What is the default status code?
    res.writeHead(res.status || 200, res.statusMessage || 'OK', res.headers);

    console.log('about to send:', msg);
    res.write(msg + '\n');
    res.end(); //After this, no more writes allowed!
    console.log('...done sending');
  };

  res.json = function(obj) {
    res.headers['Content-Type'] = 'application/json';
    this.send(JSON.stringify(obj, null, 2));
  };

  res.err = function(err) {
    console.log('res.err:', err);
    res.status = err.status || 500;
    res.statusMessage = err.statusMessage || 'Internal server error';

    this.json({ error: err });
  };

  res.headers = {
    'Content-Type': 'text/plain'
  };

  if(req.method === 'POST') {
    console.log('parsing body...');
    return parseBody(req, (err, body) => {
      if(err) return res.err(err);
      console.log('parsed body:',body);
      router.handle(req, res);
    });
  }
  router.handle(req, res);
});

server.listen(PORT, () => {
  console.log('cowsay server up', PORT);
});
