var express = require('express');
var passport = require('passport');
var router = express.Router();

/*Verify user session*/
<<<<<<< HEAD
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated() || req.path == '/login') return next();
	res.redirect('/login');
=======
var isAuthenticated = function(req, res, next) {
  return next();
  if (req.isAuthenticated() || req.path == '/login') {
    return next();
  }
  //console.log(req);
  res.redirect('/login');
>>>>>>> dev
}

router.use(isAuthenticated);
/* GET home page. */
router.get('/', function(req, res, next) {
  var data = "Express";
  req.picshare.test();
  req.parse.Cloud.run('hello', {}).then(function(result) {
    // ratings should be 4.5
    //res.render('index', { title: result['result'] });
    data = result;
    //console.log(data);
    res.render('index', {
      title: data
    });
  });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {
    title: 'Hello, World!'
  });
});

router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('_User');
  console.log(collection);
  collection.find({}, {}, function(e, docs) {
    //  console.log(docs);
    res.render('userlist', {
      "userlist": docs
    });
  });
});

router.use('/test', require('./test.js'));
router.use('/login', require('./login.js'));
router.use('/user', require('./user.js'));
router.use('/event', require('./event.js'));
router.use('/search', require('./search'));

<<<<<<< HEAD
=======
/*GET login page*/
router.get('/login', function(req, res) {
  res.render('login');
});

/*POST to login page*/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

/*Log out*/
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

>>>>>>> dev
module.exports = router;
