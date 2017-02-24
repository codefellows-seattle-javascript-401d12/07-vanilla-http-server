'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  // TODO: BUILD OUT REST OF SERVER
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}.`);
});
