
var config = {};

module.exports = {
  setRawDatabase: function setRawDatabase(controller) {
    config['RawDatabase'] = controller;
  },

  getRawDatabase: function getRawDatabase() {
    return config['RawDatabase'];
  },
  setParse: function setParse(controller) {
    config['RawDatabase'] = controller;
  },

  getParse: function getParse() {
    return config['RawDatabase'];
  }
};
