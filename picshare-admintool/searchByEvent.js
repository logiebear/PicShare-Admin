var _CoreManager = require('./CoreManager');

var eventSearch = {
     // Accepts a event string and a callback function from the caller
     searchByEvent: function searchByEvent(event, callback) {
         var parse = _CoreManager.getParse();

         // Build the query
         var Event = parse.Object.extend("Event");
         var eventQuery = new parse.Query(Event);
         eventQuery.startsWith("hashtag", event);

         // Perform the query
         eventQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 var eventlist = [];
                 for (var i = 0; i < results.length; i++) {
                     var event = {
                         "hashtag":     results[i].get("hashtag")
                     };
                     eventlist.push(event);
                 }
                 callback(eventlist);
             },
             error: function(error) {
                 // Otherwise, log the error
                 console.log(error);
             }
         });
     },


     // Accepts a event string and a callback function from the caller
     fetchEventPhotos: function fetchEventPhotos(event, callback) {
         var parse = _CoreManager.getParse();

         // Build the event portion of the query
         var Event = parse.Object.extend("Event");
         var eventQuery = new parse.Query(Event);
         eventQuery.equalTo("hashtag", event);

         // Build the photo portion of the query
         var Photo = parse.Object.extend("Photo");
         var photoQuery = new parse.Query(Photo);
         photoQuery.include("owner");
         photoQuery.include("event");

         // Find photos whose event object matches the events returned form previous query
         // (Basically a join on objectID)
         photoQuery.matchesQuery("event", eventQuery);

         // Perform the query
         photoQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 var photolist = [];
                 for (var i = 0; i < results.length; i++) {
                    var user = results[i].get("owner");
                    console.log(results[i].attributes);
                    console.log(results[i].get("owner"));
                    console.log(Object.getOwnPropertyNames(user));
                    console.log(user.attributes);
                     var photo = {
                         "objectID":     results[i].id,
                         "description":  results[i].get("descriptiveText"),
                         "hashtag":      results[i].get("event").get("hashtag"),
                         "location":     results[i].get("location"),
                         "username":     results[i].get("owner").getUsername(),
                         "created":      results[i].get("createdAt"),
                         "image":        results[i].get("image")
                     }
                     photolist.push(photo);
                 }
                 callback(photolist);
             },
             error: function(error) {
                 // Otherwise, log the error
                 console.log(error);
             }
         });
     },

     // Accepts a callback string from the caller, returning all event objects
     getAllEvents: function getAllEvents(callback) {
         var parse = _CoreManager.getParse();

         // Build the query
         var Event = parse.Object.extend("Event");
         var eventQuery = new parse.Query(Event);

         // Perform the query
         eventQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 var eventlist = [];
                 for (var i = 0; i < results.length; i++) {
                     var event = {
                         "hashtag":     results[i].get("hashtag")
                     };
                    eventlist.push(event);
                }
                callback(eventlist);
            },
             error: function(error) {
                 // Otherwise, log the error
                console.log(error);
            }
         });
     }
 };


module.exports = eventSearch;
