
var _CoreManager = require('./CoreManager');

//var _CoreManager2 = _interopRequireDefault(_CoreManager);

var Picshare = {
  initialize: function initialize(database, parse) {
    Picshare._initialize(database, parse);
  },

  _initialize: function _initialize(database, parse) {
    _CoreManager.setRawDatabase(database);
    _CoreManager.setParse(parse);
  }
};

Picshare.test = require("./test.js");

module.exports = Picshare;
