const fbPath = 'https://mypeople-5d5e0.firebaseio.com';

$(document).ready(function () {
	// TODO: group name and channel name hardcoded, make deterministic
	var messages = new Firebase(
		fbPath + '/groups/HackerGroup\-2018/events/messages/'
	);

	messages
		.limitToLast(10)
		.on('child_added', function (snapshot) {
			var users = new Firebase(
				fbPath + '/users/' + snapshot.val().uid + '/'
			);

			var username = "anonymous";
			users.on('value', function (snapshot) {

				username = snapshot.val().username;
				if (!username)
					username = snapshot.val().email;
			});

			$("#chatArea")
				.append($(document.createElement("p"))
					.text(username + " says: " + snapshot.val().content));

			// console.log(snapshot.val());
		});
});