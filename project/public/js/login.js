$(document).ready(function() {
	var config = {
        apiKey: "AIzaSyD7uRf5e4OpTiPMTdHmEA7RzhPa-lPFNrg",
        authDomain: "mypeople-5d5e0.firebaseapp.com",
        databaseURL: "https://mypeople-5d5e0.firebaseio.com",
        projectId: "mypeople-5d5e0",
        storageBucket: "mypeople-5d5e0.appspot.com",
        messagingSenderId: "347198606661"
    };
    firebase.initializeApp(config);

    var login = function() {
    	var email = $('#email').val();
    	var password = $('#password').val();
    	var auth = firebase.auth();

    	auth.signInWithEmailAndPassword(email, password)
    	.then(function() {
    		console.log("Welcome!");
    		// Show specific user welcome page
    	})
    	.catch(function(error) {
    		console.log("Incorrect email and/or password");
    		$('#password').val("");
    		// Text field error, if password is incorrect
    	});
    };

    $('#btnLogin').click(login);
});