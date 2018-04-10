$(document).ready(function () {
	/* Log the user out when logout is clicked */
	$('#logout').click(function () {
		firebase.auth().signOut();
		window.location = '/';
	});


	$("a.list-group-item").click(select);
});

function select() {
	$(this).toggleClass('list-group-select');
}