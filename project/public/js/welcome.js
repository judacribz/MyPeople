// var userId = firebase.auth().currentUser.uid;
// const dbRefObject = firebase.database().ref().child('/users/' + userId + '/');

$(document).ready(function () {
	// firebase.auth().onAuthStateChanged(user => {

	// });

	// dbRefObject.on('value', function(userShot) {
	// 	var username = userShot.val().username;
	// });

	$('#logout').click(function () {
		firebase.auth().signOut();
		window.location = '/';
	});
});