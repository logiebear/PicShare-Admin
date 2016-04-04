var express = require('express');
var router = express.Router();


/* GET Hello World page. */
router.get('/', function(req, res) {
    var data = {
        username: "Harry Potter",
        events: [],
        photos: []
    };
    res.render('event', data);
});

router.get('/getAllEvents', function(req, res) {
    var eventSearch = req.picshare.eventSearch;
    eventSearch.getAllUsers(function(result) {
        res.send(result);
    });
});

router.get('/searchByUser', function(req, res) {
    var eventSearch = req.picshare.eventSearch;
    eventSearch.searchByUser(req.param("search"), function(result) {
        res.send(result);
    });
});

router.get('/fetchUserPhotos', function(req, res) {
    console.log("eventjs");
    var eventSearch = req.picshare.eventSearch;
    eventSearch.fetchUserPhotos(req.param("event"), function(result) {
        console.log(result);
        for(var i = 0; i < result.length; ++i) {
            result[i].image = result[i].image.url();
        }
        res.send(result);
    });
});

module.exports = router;
