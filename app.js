var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express_session = require('express-session');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var routes = require('./routes/index');
var test = require('./routes/test');


// mongodb code
// it must be in front of routes code
// like app.use("/", routes)
var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('picshare:123456@ds013848.mongolab.com:13848/picshare');
var mongoose = require('mongoose');
mongoose.connect('mongodb://picshare:123456@ds013848.mongolab.com:13848/picshare');


// parse
var parse = require('parse/node').Parse;
parse.serverURL = process.env.PARSE_URL || "http://picshare-parse.herokuapp.com/parse";
parse.Cloud.useMasterKey();
parse._initialize("QxhPBK9OoKFLvvWK2PKY", "IFG5gB7cn5unrLY12aQM", "Nlddcl8AKGSDttZ6euSL");

//picshare admin tools
var picshare = require('./picshare-admintool');
picshare.initialize(mongoose, parse);
//picshare.test();
//console.log(picshare.test());
//console.log(picshare.searchByEvent());
//picshare.userSearch.searchByUser("a", console.log);

var app = express();

// view engine setup
var mustacheExpress = require('mustache-express');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// Make our db accessible to our router
app.use(function(req,res,next){
    //req.db = mongoose;
    req.parse = parse;
    req.picshare = picshare;
    next();
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up flash
app.use(express_session({ secret: process.env.MASTER_KEY || 'keyboard cat' }));
app.use(flash());

//Passport middleware for user authentication
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', routes);
//app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
