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
         photoQuery.startsWith("objectId", photo);

         // Perform the query
         photoQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 if(results.length == 0)
                    return callback.error("not found image");
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
