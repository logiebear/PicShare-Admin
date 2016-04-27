var _CoreManager = require('./CoreManager');
var schedule = require('node-schedule');

// generic expiaration function
// parameter: class of object need to clear according to expiration time
// delte all the expired object
function runAllExpiration(parseObject) {
  //Parse.Cloud.useMasterKey();
  var Parse = _CoreManager.getParse();
  //console.log(Parse);
  var Photo = Parse.Object.extend(parseObject);
  var query = new Parse.Query(Photo);
  query.limit(10);
  var today = new Date();
  console.log("test expiration");
  console.log(Photo);
  console.log(query);
  query.find().then(function(photoList) {
    console.log("Start");
    console.log(photoList.length);
    for (var i = 0; i < photoList.length; ++i) {
      photo = photoList[i];
      var date = new Date(photo.updatedAt);
      console.log(photo);
      console.log("Photo Id: " + photo.id + " " + photo.updatedAt + "; today: " + today.toString());
      console.log((today.getTime() - date.getTime()) + " " + config.ExpirationPeriod);
      if (today.getTime() - date.getTime() > config.ExpirationPeriod) {
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

// initialize expiration time
var config = {
  ExpirationPeriod: (7 * 24 * 60 * 60 * 1000)
};

module.exports = {
  // delete expired photo
  runAllExpirationPhoto: function() {
    console.log("Expire photo");
    runAllExpiration("Photo");
  },
  // delete expired event
  runAllExpirationEvent: function() {
    console.log("Expire event");
    runAllExpiration("Event");
  },
  // set expiration time by days
  setExpirationPeriodByDay: function(days) {
    config.ExpirationPeriod = days * 24 * 60 * 60 * 1000;
  },
  // initialize expiration schedule
  setExpirationSchedule: function() {
    var ExpManager = this;
    var j = schedule.scheduleJob({
      hour: 20,
      minute: 7,
      dayOfWeek: new schedule.Range(0, 6)
    }, function() {
      console.log('Time for tea! and clean Expiration');
      ExpManager.runAllExpirationEvent();
      ExpManager.runAllExpirationPhoto();
    });
    config.schedule = j;
  }
};
