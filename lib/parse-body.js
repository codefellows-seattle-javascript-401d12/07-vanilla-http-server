'use strict';

module.exports = function(req, callback) {
  req.body = '';

  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(req.body);
      console.log('req.body===================\r\n', req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
