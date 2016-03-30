var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Test Console */
router.get('/log', function(req, res, next) {
  res.send('Ready to test console');
  console.log(req.picshare.test());
  res.send('Complete');
});

module.exports = router;
