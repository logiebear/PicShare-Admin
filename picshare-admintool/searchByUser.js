var _CoreManager = require('./CoreManager');

// Accepts a user string and a callback function from the caller
function searchByUser(user, callback) {
    var parse = _CoreManager.getParse();

    // Build the user portion of the query
    var User = parse.Object.extend("User");
    var userQuery = new parse.Query(User);
    userQuery.startsWith("username", user);

    // Build the photo portion of the query
    var Photo = parse.Object.extend("Photo");
    var photoQuery = new parse.Query(Photo);

    // Join on objectID
    photoQuery.matchesKeyInQuery("owner.objectID", "objectID", userQuery);

    // Perform the query
    photoQuery.find({
        success: function(results) {
            // If successful, return the results using the provided callback
            callback(results);
        },
        error: function(error) {
            // Otherwise, log the error
            console.log(error);
        }
    });
}



module.exports = searchByUser;
