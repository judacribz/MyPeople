$(document).ready(function () {

	var myFirebase = firebase.database().ref('https://mypeople-5d5e0.firebaseio.com/groups/HackerGroup-2018/events/messages/');
	
	myFirebase.limitToLast(10).on('child_added', function (snapshot) {
		$("#chatArea").append($(document.createElement("p")).text("Joe says: " + snapshot.val().content));
		console.log(snapshot.val());
	});
});