var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var Event = req.parse.Object.extend("Event");
  var eventQuery = new req.parse.Query(Event); // get event list


  eventQuery.equalTo("hashtag", req.query.event); // get event object
    //var eventName = req.query.event;
    //res.send("I have received the event: " + eventName);

  var Photo = req.parse.Object.extend("Photo");
  var photoQuery = new req.parse.Query(Photo);

  photoQuery.matchesQuery("event", eventQuery); // get photos for event

  photoQuery.find({
      success: function(results) {
          res.send(results);
      },
      error: function(error) {
          console.log(error);
          res.send("Some kind of error occurred: " + error);
      }
  });
});

module.exports = router;
