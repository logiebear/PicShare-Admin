var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/adminUser');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('edit', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in Edit Profile: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                      var newUser = user;

                      // set the user's local credentials
                      //newUser.username = username;
                      newUser.password = createHash(password);
                      /*
                      newUser.email = req.param('email');
                      newUser.firstName = req.param('firstName');
                      newUser.lastName = req.param('lastName');
                      */

                      // save the user
                      newUser.save(function(err) {
                          if (err){
                              console.log('Error in Saving user: '+err);
                              throw err;
                          }
                          console.log('User Registration succesful');
                          return done(null, newUser);
                      });
                    } else {
                        console.log('Do not exist user: '+username);
                        return done(null, false, req.flash('message','User Does Not Exists'));
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return password;
    }

}
