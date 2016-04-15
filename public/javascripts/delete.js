var deleteList = [];
var deleteNum = 0;
var topPos = 0;

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
    document.getElementById("confirmBlock").style.display = "none";
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
        else document.getElementById("photoList").innerHTML = "<p align='center'>No Internet Connection</p>";
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

function detectScroll() {
    if(topPos == 0) topPos = checkPos();
    var headerBar = document.getElementById("listHeaderBarInner");
    if(window.pageYOffset >  topPos) {
        headerBar.style.top = (window.pageYOffset - topPos - 10) + "px";
        headerBar.classList.add("scrollDownPos");
    }
    else {
        headerBar.style.top = 0;
        headerBar.classList.remove("scrollDownPos");
    }
}

function checkPos() {
    var headerBar = document.getElementById("listHeaderBar");
    var topPos1 = 0;
    var el = headerBar;
    for (topPos1 = 0; el != null; topPos1 += el.offsetTop, el = el.offsetParent);
    return topPos1;
}

function logout(){
	if(document.getElementById("logoutButton").style.display == "block"){
		document.getElementById("logoutButton").style.display = "none";
	}else{
		document.getElementById("logoutButton").style.display = "block";
	}
}