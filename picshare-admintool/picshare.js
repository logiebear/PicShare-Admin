
_CoreManager = require('./CoreManager.js');

//var _CoreManager2 = _interopRequireDefault(_CoreManager);

var Picshare = {
  // initialize piachare tools
  // parameter : mongodb database, parse server
  initialize: function initialize(database, parse) {
    Picshare._initialize(database, parse);
  },

  _initialize: function _initialize(database, parse) {
    _CoreManager.setRawDatabase(database);
    _CoreManager.setParse(parse);
    // initialize net gate system
    var passport = require('passport');
    var initPassport = require('./passport/init');
    initPassport(passport);


  },
  // Set Expiration time schedule
  setExpirationSchedule : function() {
    this.ExpirationManager.setExpirationSchedule();
  }
};

Picshare.test = require("./test.js");
Picshare.eventSearch = require("./searchByEvent.js");
Picshare.userSearch = require("./searchByUser.js");
Picshare.ExpirationManager = require("./ExpirationManager.js");
Picshare.DeleteManager = require("./DeleteManager.js");

module.exports = Picshare;
