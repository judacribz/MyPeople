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
    
    /* var cobaChat = new firebase('https://mypeople-5d5e0.firebaseio.com/groups');
    console.log(cobaChat); */

    /* Handles the login */
    var login = function () {
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password)
            .then(function () {
                window.location = "/channel";
            })
            .catch(function (error) {
                console.log("Incorrect email and/or password");
                $('#password').val("");
                // Text field error, if password is incorrect
            });
    };

    /* Login the user if the enter key is pressed from the email field */
    $('#email').keypress(function (e) {
        if (e.which == 13) {
            login();
            return false;
        }
    });

    /* Login the user if the enter key is pressed from the password field */
    $('#password').keypress(function (e) {
        if (e.which == 13) {
            login();
            return false;
        }
    });

    /* Login the user if login button is clicked */
    $('#btnLogin').click(login);

    /* Take user to sign up page if sign up link button is clicked */
    $('#btnSignUp').click(function () {
        window.location = "/signup";
    });

    /* Check if the authentication state has been changed, either if the user is logged in or not */
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser + " is logged in.");
        } else {
            console.log("No one logged in.");
        }
    });
});