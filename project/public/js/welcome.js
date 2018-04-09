$(document).ready(function () {
	const fbPath = 'https://mypeople-5d5e0.firebaseio.com';
	var fbDatabase = firebase.database();

	/* Populate the list group with user channels */
	var groups = fbDatabase.ref('groups/');
	groups.on('child_added', function(groupShot) {
		$('.list-group').append("<a class='list-group-item list-group-item-action'>"+groupShot.key+ "</a>");
	});

	/* If list group item is clicked then take the user to the respective channel
	TODO: Get list group item clicked and take user to the respective channel page, 
	so far if user clicks on any list group item, it will take user to channel.pug page */
	$('.list-group').click(function() {
		window.location = '/channel';
	});

	/* Log the user out when logout is clicked */
	$('#logout').click(function () {
		firebase.auth().signOut();
		window.location = '/';
	});
});