'use strict';

module.exports = function(req, cb) { //if you just export a function, you can use your var x = require(y) directly
  req.body = '';

  req.on('data', (data) => { //concat chunks as they come in
    req.body += data.toString();
  });

  req.on('end', () => { //time to parse the string - reverse of stringify
    try {
      req.body = JSON.parse(req.body);
      cb(null, req.body);
    }
    catch (err) {
      cb(err);
    }
  });
};
