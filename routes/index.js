var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data="Express";
  req.picshare.test();
  req.parse.Cloud.run('hello', {}).then(function(result) {
  // ratings should be 4.5
  //res.render('index', { title: result['result'] });
   data = result;
   //console.log(data);
   res.render('index', { title: data});
});
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('_User');
    console.log(collection);
    collection.find({},{},function(e,docs){
    //  console.log(docs);
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
