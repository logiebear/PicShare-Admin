var express = require('express');
var router = express.Router();

router.post('/', function(req, res,next){
    var pic = req.picshare.DeleteManager
    /*
    console.log("Delete Photo");
    console.log(pic);
    console.log(pic.deletePhoto);
    */
    if(req.param('type') == 'photo') {
    pic.deletePhoto(req.param('photoId'), {
      success: function(){
      console.log("Photo Deleted");
      //console.log(result);
      res.send({result : "success"});
    },
      error: function(err) {
        res.send({result : "failed", error :err});
      }}
      );
  }
});

module.exports = router;
