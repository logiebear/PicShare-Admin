function searchByEvent() {
  //console.log("test");
  var cursor = db.collection('Event').find( );
  return cursor;
  //return "searchByEvent";
}


module.exports = searchByEvent;
