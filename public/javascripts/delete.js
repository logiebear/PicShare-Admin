var deleteList = [];
var deleteNum = 0

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function loadImage(img, imageSrc) {
    var downloadingImage = new Image();
    downloadingImage.onload = function(){
        img.src = this.src;   
    };
    downloadingImage.src = imageSrc;
}

function select(item){
	for(var i = 0; i < deleteList.length; ++i) {
		if(deleteList[i] == item){
			document.getElementById(deleteList[i]).className = "portfolio-item";
			deleteList.splice(i, 1);
			if(deleteList.length == 0){
				document.getElementById("deleteBlock").style.display = "none";
			}
			return;
		}
	}
	document.getElementById(item).className = "blur";
	deleteList.push(item);
	document.getElementById("deleteBlock").style.display = "block";
}

function cancel(){
	for(var i = 0; i < deleteList.length; ++i) {
		document.getElementById(deleteList[i]).className = "portfolio-item";
	}
	deleteList.length = 0;
	document.getElementById("deleteBlock").style.display = "none";
}

function photoDelete(photoId){
	var postData = { photoId : photoId, type : "photo" };
	objectDelete(postData);
}

function objectDelete(postData) {
	$.post( "/delete", postData, function( data ) {
  		if(data.result == "success") {
            deleteNum++;
            if(deleteNum == deleteList.length) {
                if(typeof currEvent !== 'undefined') getPhotos(currEvent);
                else getPhotos(currUser);
            }
  			console.log("success");
  		}
	}, "json");
}

function picDelete() {
    var loadingMsg = "<p align='center'>Refreshing. Please wait</p>";
    document.getElementById("photoList").innerHTML = loadingMsg;
	for(var i = 0; i < deleteList.length; ++i) {
		photoDelete(deleteList[i]);
	}
	document.getElementById("confirmBlock").style.display = "none";
	document.getElementById("deleteBlock").style.display = "none";
    
}

function notDelete(){
	document.getElementById("confirmBlock").style.display = "none";
}

function deleteConfirm(){
	document.getElementById("confirmBlock").style.display = "block";
}

function logout(){
	if(document.getElementById("logoutButton").style.display == "block"){
		document.getElementById("logoutButton").style.display = "none";
	}else{
		document.getElementById("logoutButton").style.display = "block";
	}
}