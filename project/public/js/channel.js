$(document).ready(function () {
	const fbPath = 'https://mypeople-5d5e0.firebaseio.com';
	var fbDatabase = firebase.database();
	// TODO: group name and channel name hardcoded, make deterministic
	var messages = fbDatabase
		.ref('groups/HackerGroup-2018/channels/events/messages/');

	var username;
	messages
		.limitToLast(10)
		.on('child_added', function (userShot) {
			var users = fbDatabase
				.ref('users/' + userShot.val().uid);

			users.on('value', function (messageShot) {
				username = 'anonymous';
				if (messageShot.val()) {
					username = messageShot.val().username;
				}

				$("#chatArea")
					.append($(document.createElement("p"))
						.text(username + " says: " + userShot.val().content));
			});
		});
});