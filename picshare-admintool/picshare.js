
_CoreManager = require('./CoreManager.js');

//var _CoreManager2 = _interopRequireDefault(_CoreManager);

var Picshare = {
  initialize: function initialize(database, parse) {
    Picshare._initialize(database, parse);
  },

  _initialize: function _initialize(database, parse) {
    _CoreManager.setRawDatabase(database);
    _CoreManager.setParse(parse);
    //console.log(_CoreManager.getParse());
  }
};

Picshare.test = require("./test.js");
Picshare.ExpirationManager = require("./ExpirationManager.js");
module.exports = Picshare;
