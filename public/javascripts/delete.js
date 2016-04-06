var deleteList = [];
var lastOwner = "";

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
  			console.log("success");
  		}
	}, "json");
}

function picDelete() {
	for(var i = 0; i < deleteList.length; ++i) {
		photoDelete(deleteList[i]);
	}
	document.getElementById("confirmBlock").style.display = "none";
	document.getElementById("deleteBlock").style.display = "none";
	//getPhotos(lastOwner);
}

function notDelete(){
	document.getElementById("confirmBlock").style.display = "none";
}

function deleteConfirm(){
	document.getElementById("confirmBlock").style.display = "block";
}