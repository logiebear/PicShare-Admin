var _CoreManager = require('./CoreManager');

var userSearch = {
    // Accepts a user string and a callback function from the caller
    searchByUser: function searchByUser(user, callback) {
        var parse = _CoreManager.getParse();

        // Build the query
        var User = parse.User.extend();
        var userQuery = new parse.Query(User);
        userQuery.startsWith("username", user);

        // Perform the query
        userQuery.find({
            success: function(results) {
                // If successful, capture the results in JSON format and
                // return the JSON using the provided callback
                var userlist = [];
                for (var i = 0; i < results.length; i++) {
                    var user = {
                        "username":     results[i].getUsername()
                    };
                    userlist.push(user);
                }
                callback(userlist);
            },
            error: function(error) {
                // Otherwise, log the error
                console.log(error);
            }
        });
    },

    // Accepts a user string and a callback function from the caller
    fetchUserPhotos: function fetchUserPhotos(user, callback) {
        var parse = _CoreManager.getParse();

        // Build the user portion of the query
        var User = parse.User.extend();
        var userQuery = new parse.Query(User);
        userQuery.equalTo("username", user);

        // Build the photo portion of the query
        var Photo = parse.Object.extend("Photo");
        var photoQuery = new parse.Query(Photo);
        photoQuery.include("owner");
        photoQuery.include("event");

        // Find photos whose owner object matches the users returned form previous query
        // (Basically a join on objectID)
        photoQuery.matchesQuery("owner", userQuery);

        // Perform the query
        photoQuery.find({
            success: function(results) {
                // If successful, capture the results in JSON format and
                // return the JSON using the provided callback
                var photolist = [];
                for (var i = 0; i < results.length; i++) {
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

    // Accepts a callback string from the caller, returning all user objects
    getAllUsers: function getAllUsers(callback) {
        var parse = _CoreManager.getParse();

        // Build the query
        var User = parse.User.extend();
        var userQuery = new parse.Query(User);

        // Perform the query
        userQuery.find({
            success: function(results) {
                // If successful, capture the results in JSON format and
                // return the JSON using the provided callback
                var userlist = [];
                for (var i = 0; i < results.length; i++) {
                    var user = {
                        "username":     results[i].get("username")
                    };
                    userlist.push(user);
                }
                callback(userlist);
            },
            error: function(error) {
                // Otherwise, log the error
                console.log(error);
            }
        });
    }
};

module.exports = userSearch;
