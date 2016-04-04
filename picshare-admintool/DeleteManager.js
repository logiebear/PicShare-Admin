var _CoreManager = require('./CoreManager.js');


var  deleteManager = {
     // Accepts a event string and a callback function from the caller
     deletePhoto: function myObject(photo, callback) {

         var parse = _CoreManager.getParse();
/*
         console.log(parse.Promise);
         parse.Promise.get(photo).destroy({
          success:function(result){
            callback.success();
            // The object was deleted from database
          },
          error: function(myObject, error) {
          // The deletion failed.
            callback.error(error);
          }
        });*/
         // Build the query
         var Photo = parse.Object.extend("Photo");
         var photoQuery = new parse.Query(Photo);
         photoQuery.equalTo("objectId", photo);

         // Perform the query
         photoQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 if(results.length == 0)
                    return callback.error("photo not found");
                 for (var i = 0; i < results.length; i++) {
                      results[i].destroy({
                       success:function(result){
                         callback.success();
                         // The object was deleted from database
                       },
                       error: function(myObject, error) {
                       // The deletion failed.
                         callback.error(error);
                       }
                     })
                }
             },
             error: function(error) {
                 // Otherwise, log the error
                 calllback.error(error);
             }
         });
     },

     deleteEvent: function myObject(event, callback) {

         var parse = _CoreManager.getParse();
/*
         console.log(parse.Promise);
         parse.Promise.get(photo).destroy({
          success:function(result){
            callback.success();
            // The object was deleted from database
          },
          error: function(myObject, error) {
          // The deletion failed.
            callback.error(error);
          }
        });*/
         // Build the query
         var Event = parse.Object.extend("Event");
         var eventQuery = new parse.Query(Event);
         eventQuery.equalTo("objectId", event);

         // Perform the query
         eventQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 if(results.length == 0)
                    return callback.error("event not found");
                 for (var i = 0; i < results.length; i++) {
                      results[i].destroy({
                       success:function(result){
                         callback.success();
                         // The object was deleted from database
                       },
                       error: function(myObject, error) {
                       // The deletion failed.
                         callback.error(error);
                       }
                     })
                }
             },
             error: function(error) {
                 // Otherwise, log the error
                 calllback.error(error);
             }
         });
     },

     deleteUser: function myObject(user, callback) {

         var parse = _CoreManager.getParse();
/*
         console.log(parse.Promise);
         parse.Promise.get(photo).destroy({
          success:function(result){
            callback.success();
            // The object was deleted from database
          },
          error: function(myObject, error) {
          // The deletion failed.
            callback.error(error);
          }
        });*/
         // Build the query
         var User = parse.Object.extend("User");
         var userQuery = new parse.Query(User);
         userQuery.equalTo("objectId", user);

         // Perform the query
         userQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 if(results.length == 0)
                    return callback.error("user not found");
                 for (var i = 0; i < results.length; i++) {
                      results[i].destroy({
                       success:function(result){
                         callback.success();
                         // The object was deleted from database
                       },
                       error: function(myObject, error) {
                       // The deletion failed.
                         callback.error(error);
                       }
                     })
                }
             },
             error: function(error) {
                 // Otherwise, log the error
                 calllback.error(error);
             }
         });
     }
}

module.exports = deleteManager;
