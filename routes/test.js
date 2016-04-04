var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Test Console */
router.get('/log', function(req, res, next) {
  res.send('Ready to test console');
  console.log(req.picshare.test());
  res.send('Complete');
});

/* Test Expiration */
router.get('/exp', function(req, res, next) {
    console.log("Enter Expiration");
    /* req.parse.Cloud.run('runAllExpiration', {}).then(function(result) {
      res.send('Result');
    });
    */
    var em = req.picshare.ExpirationManager;
    console.log("Expiration Test Start");
    console.log(em);
    em.runAllExpirationEvent();
    em.runAllExpirationPhoto();
    em.setExpirationPeriodByDay(1);
    res.send("Test");
});

router.get('/searchEvent', function(req, res, next) {
  var pic = req.picshare.eventSearch;
  console.log("Start search event");
  pic.searchByEvent("Library", function(result) {
    console.log("Search Event Reuslt");
    console.log(result);
    res.send(result);
  });
});

router.get('/fetchEvent', function(req, res, next){
  var pic = req.picshare.eventSearch
  console.log("Start fetch event photos");
  pic.fetchEventPhotos("Library", function(result){
    console.log("Fetch Event Photos Result");
    console.log(result);
    res.send(result);
  });
});

router.get('/getEvents', function(req, res,next){
    var pic = req.picshare.eventSearch
    console.log("Start get all events");
    pic.getAllEvents(function(result){
      console.log("Get All Events");
      console.log(result);
      res.send(result);
    });
});

router.get('/deletePhoto', function(req, res,next){
    var pic = req.picshare.DeleteManager
    console.log("Delete Photo");
    console.log(pic);
    console.log(pic.deletePhoto);

    pic.deletePhoto("OQqYTYfdtx", {
      success: function(){
      console.log("Photo Deleted");
      //console.log(result);
      res.send("Photo deleted");
    },
      error: function(err) {
        res.send(err);
      }})
  ;
});


router.get('/deleteEvent', function(req, res,next){
    var pic = req.picshare.DeleteManager
    console.log("Delete Event");
    console.log(pic);
    console.log(pic.deleteEvent);

    pic.deleteEvent("yW2EfhIVBk", {
      success: function(){
      console.log("Event Deleted");
      //console.log(result);
      res.send("Event deleted");
    },
      error: function(err) {
        res.send(err);
      }})
  ;
});

router.get('/deleteUser', function(req, res,next){
    var pic = req.picshare.DeleteManager
    console.log("Delete User");
    console.log(pic);
    console.log(pic.deleteUser);

    pic.deleteUser("uKSB9kNRII", {
      success: function(){
      console.log("User Deleted");
      //console.log(result);
      res.send("User deleted");
    },
      error: function(err) {
        res.send(err);
      }})
  ;
});
module.exports = router;
