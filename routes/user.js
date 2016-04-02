var express = require('express');
var router = express.Router();


/* GET Hello World page. */
router.get('/', function(req, res) {
	var data = {
		username: "Harry Potter",
		users: [
			{userID: "user1"},
			{userID: "user2"},
			{userID: "user3"}
		],
		photos: [
			{photoID: "IMG_0518", src:"images/Photos/IMG_0518.jpg", photoUsr: "user1", 
			eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0518')"},
			{photoID: "IMG_0674", src:"images/Photos/IMG_0674.jpg", photoUsr: "user1", 
			eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0674')"},
			{photoID: "IMG_0808", src:"images/Photos/IMG_0808.jpg", photoUsr: "user1", 
			eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_0808')"},
			{photoID: "IMG_1082", src:"images/Photos/IMG_1082.jpg", photoUsr: "user1", 
			eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_1082')"},
			{photoID: "IMG_1175", src:"images/Photos/IMG_1175.jpg", photoUsr: "user1", 
			eventID: "event2", uploadDate: "03/01/2016", onclick: "select('IMG_1175')"}
		]
	};

    res.render('user', data);
});

router.get('/getAllUsers', function(req, res) {
	var userSearch = req.picshare.userSearch;
	console.log(userSearch);
    data = userSearch.getAllUsers(function(result) {
    	console.log(result);
    	console.log("test result");
    	res.send(result);
    });
});


module.exports = router;