var express = require('express');
var router = express.Router();


/* GET Hello World page. */
router.get('/', function(req, res) {
    res.render('login', {});
});


module.exports = router;