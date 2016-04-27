var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/adminUser');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('edit', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
				// create a new user, or edit password of an existed user
        function(req, username, password, done) {

            findOrCreateUser = function(){
                  console.log(req.param("username"));
                  console.log(req.user.username);
                      
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  req.user.username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in Edit Profile: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                      if(!isValidPassword(user, req.param("cur_password"))) return done(null, false, req.flash('message','Invalid Password'));
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
                          console.log('User password modification succesful');
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

    var isValidPassword = function(user, password) {
    // return bCrypt.compareSync(password, user.password);
    return user.password == password;
  }
}
