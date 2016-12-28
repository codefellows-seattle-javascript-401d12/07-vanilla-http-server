'use strict';

module.exports = function(req, res,callback) {
  req.body = '';

  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      callback(req.body);
    } catch (err) {
      callback(err);
    }
  });
};
//I tried but could not succeed to understand and use this body parser!!
