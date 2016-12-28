'use strict';
const cowsay = require('cowsay');



module.exports = function(req, res){
  var empty = function(obj){
    for( var prop in obj){
      return prop;
    }
    return false;
  };

  if(empty(req) === false){
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({ text: 'bad request' }));
    res.end();
  }
  if(empty(req) !== false){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = JSON.stringify(req);
    res.write(cowsay.say({text : message}));
    res.end();
  }
  res.end();
};
