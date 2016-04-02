var deleteList = [];

function select(item){
	document.getElementById(item).className = "blur";
	deleteList.push(item);
}