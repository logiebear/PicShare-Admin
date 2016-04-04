var User = require('../models/adminUser');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = function(user){
  var newUser = new User();

  // set the user's local credentials
  newUser.username = user.username;
  // newUser.password = createHash(user.password);
  newUser.password = user.password;
  newUser.email = "email@email";

  // save the user
  newUser.save(function(err) {
      if (err){
          console.log('Error in Saving user: '+err);
          throw err;
      }
      console.log('User Registration succesful');
      return newUser;
  });
};
