//Define admin user object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserInfo = new Schema({
      username: String,
      password: String
    }, {
      collection: 'AdminUser'
    });
var adminUser = mongoose.model('AdminUser', UserInfo);
module.exports = adminUser;