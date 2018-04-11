$(document).ready(function () {
	var fbDatabase = firebase.database();
	// TODO: group name and channel name hardcoded, make deterministic
	var messages = fbDatabase
		.ref('groups/' + $("#group").text().split(' > ')[0] + '/channels/' + $("#group").text().split(' > ')[1] + '/messages/');

	// $("." + $("#currUser").text()).addClass("text-right");

	var userClass = $("#currUser").text();

	var username;
	messages
		.limitToLast(20)
		.orderByKey()
		.on('child_added', function (userShot) {
			var users = fbDatabase
				.ref('users/' + userShot.val().uid);

			users.on('value', function (messageShot) {
				username = 'anonymous';
				if (messageShot.val()) {
					username = messageShot.val().username;
				}

				$("#messageArea #messageDisplay")
					.append($(document.createElement("h3")).addClass(username, 'text-left').text(username))
					.append($(document.createElement("p")).addClass(username, 'text-left').text(userShot.val().content));

				var disp = document.getElementById('messageDisplay');
				disp.scrollTop = disp.scrollHeight;

				$('.' + userClass).addClass('text-right');

			});

		});

});