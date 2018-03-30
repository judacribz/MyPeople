$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyD7uRf5e4OpTiPMTdHmEA7RzhPa-lPFNrg",
        authDomain: "mypeople-5d5e0.firebaseapp.com",
        databaseURL: "https://mypeople-5d5e0.firebaseio.com",
        projectId: "mypeople-5d5e0",
        storageBucket: "mypeople-5d5e0.appspot.com",
        messagingSenderId: "347198606661"
    };
    firebase.initializeApp(config);

    /* Handles the sign up */
    var signup = function() {
    	var email = $('#email').val();
    	var password = $('#password').val();
    	var username = $('#username').val();
    	var confirmPassword = $('#confirmPassword').val();
    	var auth = firebase.auth();

    	if (password != confirmPassword || password.length < 6) {
    		console.log("Password Invalid.");
    	} else {
    		auth.createUserWithEmailAndPassword(email, password).then(function() {
    			// TODO: Find a way to add username to firebase, take user back to login page after signup
    			console.log("Added to Database!");
    		}).catch(function(error) {
    			$('#password').val("");
    			$('#confirmPassword').val("");
    			console.log(error.message);
    		});
    	}
    };

    /* Sign the user up if enter button is clicked */
    $(document).keypress(function(e) {
    	if (e.which == 13) {
    		signup();
    		return false;
    	}
    });

    /* Sign the user up if the signup button is clicked */
    $('#btnSignUp').click(signup);

    /* Take the user back to the login page if cancel button is clicked */
    $('#btnCancel').click(function() {
    	window.location = "/";
    });
});