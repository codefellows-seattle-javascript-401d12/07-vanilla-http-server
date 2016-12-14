'use strict';

//node modules
const http = require('http');
const url = require('url');
const queryString = require('querystring');
//npm modules
const cowsay = require('cowsay');
//app modules
const parseBody = require('./lib/parse-body.js');
//module constants
const PORT = process.env.PORT || 3000;

//module logic
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
