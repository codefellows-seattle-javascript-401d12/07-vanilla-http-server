'use strict';

module.exports = function(req, callback) {
  req.on('data', data => {
    req.body = req.body || '';
    req.body += data.toString();
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch(err) {
      callback(err);
    }
  });
};
