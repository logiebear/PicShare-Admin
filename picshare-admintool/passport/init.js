var login = require('./login');
var signup = require('./signup');
var adminUser = require('../models/adminUser');


module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        adminUser.findById(id, function(err, user) {
            done(err, user);
        });
    });
    login(passport);
    //signup(passport);
}
