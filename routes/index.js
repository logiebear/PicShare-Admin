var express = require('express');
var passport = require('passport');
var router = express.Router();

/*Verify user session*/
var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated() || req.path == '/login') {
    return next();
  }
  res.redirect('/login');
}

/* Add verification to routing */
router.use(isAuthenticated);

/* GET request: home page. */
router.get('/', function(req, res, next) {
  var data = "Express";
  req.picshare.test();
  req.parse.Cloud.run('hello', {}).then(function(result) {
    data = result;

  });
  res.redirect('/user');
});

/* Logout */
router.use('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

/* Edit Profile */
router.post('/edit', passport.authenticate('edit', {
  successRedirect: '/',
  failureRedirect: '/edit',
  failureFlash : true
}));

router.get('/edit', function(req, res, next) {
  res.render('edit', {
    username: req.user.username || "Harry Potter",
    message: req.flash('message')
  });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {
    title: 'Hello, World!'
  });
});

/* GET user list page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('_User');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* Add all sub view into routes */
router.use('/test', require('./test.js'));
router.use('/login', require('./login.js'));
router.use('/user', require('./user.js'));
router.use('/event', require('./event.js'));
router.use('/search', require('./search'));
router.use('/delete', require('./delete'));

module.exports = router;
