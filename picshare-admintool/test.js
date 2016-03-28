var _CoreManager = require('./CoreManager');
function test() {
  //console.log("test");
  var parse =  _CoreManager.getParse();
  parse.Cloud.run('hello', {}).then(function(result) {
  // ratings should be 4.5
  //res.render('index', { title: result['result'] });
   data = result;
   console.log(data);
   return data;
  });
  //return _CoreManager.getRawDatabase();
};

module.exports = test;
