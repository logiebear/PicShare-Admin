var _CoreManager = require('./CoreManager.js');


var delete = {
     // Accepts a event string and a callback function from the caller
     deletePhoto: function deletePhoto(photo, callback) {
         var parse = _CoreManager.getParse();

         // Build the query
         var Photo = parse.Object.extend("Photo");
         var photoQuery = new parse.Query(Photo);
         photoQuery.equalTo("id", photo);

         // Perform the query
         photoQuery.find({
             success: function(results) {
                 // If successful, capture the results in JSON format and
                 // return the JSON using the provided callback
                 for (var i = 0; i < results.length; i++) {
                     results[i].destroy({
                       success:function(results[i]){
                         // The object was deleted from database
                       }
                       error: function(error) {
                       // The deletion failed.
                       console.log(error);
                       }
                     })
                }
             },
             error: function(error) {
                 // Otherwise, log the error
                 console.log(error);
             }
         });
     },
}

module.exports = delete;
