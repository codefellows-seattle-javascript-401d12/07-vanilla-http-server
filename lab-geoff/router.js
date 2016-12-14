'use strict';

const cowsay = require('cowsay');

const Router = require('./model/router-constructor.js').Router;
const router = new Router();

router.add('GET', '/', function(req, res) {
  res.send('hello from my server!');
});

function say(params, res) {
  let text = params.text;
  if(!text || text.length == 0) {
    res.status = 400;
    res.statusMessage = 'bad request';
    return res.send(cowsay.say({ text: 'bad request' }));
  }
  let msg = cowsay.say({
    text: text,
    f: params.f || 'beavis.zen'
  });
  res.send(msg);
}

router.add('GET', '/cowsay', function(req, res) {
  console.log('GET /cowsay');
  say(req.url.query, res);
});

router.add('POST', '/cowsay', function(req, res) {
  console.log('POST /cowsay');
  say(req.body, res);
});

module.exports = router;
