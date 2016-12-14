'use strict';

//exporting contents of module
module.exports = function(req, callback) {
  req.body = '';

  //accumulating data into the body
  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
