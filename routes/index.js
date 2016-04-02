var express = require('express');
var router = express.Router();

/*Verify user session*/
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		 next();
	res.redirect('/login');
}

router.use(isAuthenticated);
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

/*GET login page*/
router.get('/login', function(req, res) {
    res.render('login');
});

/*POST to login page*/
router.post('/login', passport.authenticate('local',
            { successRedirect: '/',
              failureRedirect: '/login',
              failureFlash: true }), 
);
            
/*Log out*/
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;
