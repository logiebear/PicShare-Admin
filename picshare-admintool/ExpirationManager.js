var _CoreManager = require('./CoreManager');


var config = {

};

module.exports = {
  runAllExpiration: function() {
    //Parse.Cloud.useMasterKey();
    var Parse = _CoreManager.getParse();
    //console.log(Parse);
    var Photo = Parse.Object.extend("Photo");
    var query = new Parse.Query(Photo);
    query.limit(10);
    var today = new Date();
    console.log("test expiration");
    console.log(Photo);
    console.log(query);
    query.find().then(function(photoList) {
      console.log("Start");
      console.log(photoList);
      for (var i in photoList) {
        photo = photoList[i];
        var keys = Object.keys(photo);
        var date = new Date(photo.updatedAt);
        console.log(photo);
        console.log("Photo Id: " + photo.id + " " + photo.updatedAt + " " + today.toString() + keys);
        console.log((date.getTime() - today.getTime()) + " " + 7 * 24 * 60 * 60 * 1000);
        if (today.getTime() - date.getTime() > 7 * 24 * 60 * 60 * 1000) {
          console.log("Photo should be deleted");
          photo.destroy({
            success: function(myObject) {
              console.log("destroyed successfully");
            },
            error: function(myObject, error) {
              console.log("failed to destroy");
            }
          });
        }
      }
      //status.success("Migration completed successfully.");
    });
  }
};
