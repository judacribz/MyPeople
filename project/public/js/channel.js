const fbPath = 'https://mypeople-5d5e0.firebaseio.com';

$(document).ready(function () {
	// TODO: group name and channel name hardcoded, make deterministic
	var myFirebase = new Firebase(
		fbPath + '/groups/HackerGroup\-2018/events/messages/'
	);

	myFirebase
		.limitToLast(10)
		.on('child_added', function (snapshot) {
			$("#chatArea")
				.append($(document.createElement("p"))
					.text(snapshot.val().username + " says: " + snapshot.val().content));

			// console.log(snapshot.val());
		});
});