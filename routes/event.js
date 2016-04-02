var express = require('express');
var router = express.Router();


/* GET Hello World page. */
router.get('/', function(req, res) {
    var data = {
        username: "Harry Potter",
        events: [
            {eventID: "event1"},
            {eventID: "event2"},
            {eventID: "event3"}
        ],
        photos: [
            {photoID: "IMG_0046", src:"images/Photos/IMG_0046.jpg", photoUsr: "user1", 
            eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0046')"},
            {photoID: "IMG_0087", src:"images/Photos/IMG_0087.jpg", photoUsr: "user1", 
            eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0087')"},
            {photoID: "IMG_0209", src:"images/Photos/IMG_0209.jpg", photoUsr: "user1", 
            eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0209')"},
            {photoID: "IMG_0349", src:"images/Photos/IMG_0349.jpg", photoUsr: "user1", 
            eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0349')"},
            {photoID: "IMG_0385", src:"images/Photos/IMG_0385.jpg", photoUsr: "user1", 
            eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0385')"}
        ]
    };

    res.render('event', data);
});


module.exports = router;
