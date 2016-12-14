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
