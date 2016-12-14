'use strict';

//TODO: Refactor all the cowsay routes into a cowsay module.
const cowsay = require('cowsay');

const Router = require('./model/router-constructor.js').Router;
const router = new Router();

router.add('GET', '/', function(req, res) {
  res.send('hello from my server!');
});

//TODO: Refactor all the cowsay routes into a cowsay module.
router.add('GET', '/cowsay', function(req, res) {
  console.log('GET /cowsay');
  let q = req.url.query.text;
  let msg = (q && q.length > 0) ? q : 'text=Tell me what to say';
  msg = cowsay.say({
    text: msg,
    f: 'dragon',
    e: '--',
    T: 'Y'
  });
  res.send(msg);
});

//TODO: Refactor all the cowsay routes into a cowsay module.
router.add('POST', '/cowsay', function(req, res) {
  console.log('POST /cowsay');
  //For now, I'm just going to pass the body to cowsay
  if(!req.body || !req.body.text || req.body.text.length <= 0) {
    console.log('body is missing "text"');
    // return handleErr('Cannot find valid "text" param in POST body', req, res);
    return res.err('Cannot find valid "text" param in POST body', req, res);
  }

  let msg = cowsay.say(req.body);
  res.send(msg);
});

module.exports = router;
