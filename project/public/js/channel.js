$(document).ready(function () {
	const fbPath = 'https://mypeople-5d5e0.firebaseio.com';

	// TODO: group name and channel name hardcoded, make deterministic
	var messages = new Firebase(
		fbPath + '/groups/HackerGroup\-2018/events/messages/'
	);

	messages
		.limitToLast(10)
		.on('child_added', function (userShot) {
			var users = new Firebase(
				fbPath + '/users/' + userShot.val().uid + '/'
			);

			users.on('value', function (messageShot) {
				var username = messageShot.val().username;

				$("#chatArea")
					.append($(document.createElement("p"))
						.text(username + " says: " + userShot.val().content));
			});
		});
});