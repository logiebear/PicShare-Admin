var deleteList = [];

function select(item){
	document.getElementById(item).className = "blur";
	deleteList.push(item);
}

function cancel(){
	for(var i = 0; i < deleteList.length; ++i) {
		document.getElementById(deleteList[i]).className = "portfolio-item";
	}
	deleteList.length = 0;
}


function photoDelete(photoId){
	var postData = { photoId : photoId, type : "photo" };
	objectDelete(postData);
}

function objectDelete(postData) {
	$.post( "/delete", postData, function( data ) {
  		if(data.result == "success") {
  				console.log("success");
  		} else {

  		}
	}, "json");
}

function picDelete() {
	for(var i = 0; i < deleteList.length; ++i) {
		photoDelete(deleteList[i]);
	}
	document.getElementById("confirmBlock").style.display = "none";
}

function notDelete(){
	document.getElementById("confirmBlock").style.display = "none";
}

function deleteConfirm(){
	document.getElementById("confirmBlock").style.display = "block";
}