//Define admin user object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema of our admin users
var UserInfo = new Schema({
      username: String,
      password: String
    }, {
      collection: 'AdminUser'
    });
var adminUser = mongoose.model('AdminUser', UserInfo);
module.exports = adminUser;
