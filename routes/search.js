var express = require('express');
var router = express.Router();

/* JSON request: Serarch by user name  */
router.get('/byuser', function(req, res, next) {
    var User = req.parse.Object.extend("User");
    var userQuery = new req.parse.Query(User);
    userQuery.startsWith("username", req.query.user);

    var Photo = req.parse.Object.extend("Photo");
    var photoQuery = new req.parse.Query(Photo);

    photoQuery.matchesQuery("owner", userQuery);

    photoQuery.find({
        success: function(results) {
            res.send(results);
        },
        error: function(error) {
            res.send("Some kind of error occurred: " + error);
        }
    });
});

/* JSON request: show all users info */
router.get('/allusers', function(req, res, next) {
    var User = req.parse.Object.extend("User");
    var query = new req.parse.Query(User);
    query.find({
        success: function(results) {
            res.send(results);
        },
        error: function(error) {
            res.send("Some kind of error occurred: " + error);
        }
    });
});

/* JSON request: show all photos info */
router.get('/allphotos', function(req, res, next) {
    var Photo = req.parse.Object.extend("Photo");
    var query = new req.parse.Query(Photo);
    query.find({
        success: function(results) {
            res.send(results);
        },
        error: function(error) {
            res.send("Some kind of error occurred: " + error);
        }
    });
});

/* JSON request: show all events info */
router.get('/allevents', function(req, res, next) {
    var Event = req.parse.Object.extend("Event");
    var query = new req.parse.Query(Event);
    query.find({
        success: function(results) {
            res.send(results);
        },
        error: function(error) {
            res.send("Some kind of error occurred: " + error);
        }
    });
});

module.exports = router;
