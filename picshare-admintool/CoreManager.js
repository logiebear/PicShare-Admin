
var config = {};

module.exports = {
  setRawDatabase: function setRawDatabase(controller) {
    config['RawDatabase'] = controller;
  },

  getRawDatabase: function getRawDatabase() {
    return config['RawDatabase'];
  },
  setParse: function (controller) {
    config['Parse'] = controller;
  },

  getParse: function () {
    return config['Parse'];
  }
};
