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
    eventSearch.getAllEvents(function(result) {
        res.send(result);
    });
});

router.get('/searchByEvent', function(req, res) {
    var eventSearch = req.picshare.eventSearch;
    eventSearch.searchByEvent(req.param("search"), function(result) {
        res.send(result);
    });
});

router.get('/fetchEventPhotos', function(req, res) {
    var eventSearch = req.picshare.eventSearch;
    eventSearch.fetchEventPhotos(req.param("event"), function(result) {
        for(var i = 0; i < result.length; ++i) {
            result[i].image = result[i].image.url();
        }
        res.send(result);
    });
});

module.exports = router;
