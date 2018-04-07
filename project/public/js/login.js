$(document).ready(function () {

    /* Handles the login */
    var login = function () {
        var email = $('#email').val();
        var password = $('#password').val();
        var auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password).then(function () {
            window.location = "/welcome";
        }).catch(function (error) {
            console.log(error.message);
            $('#password').val("");
            // Text field error, if password is incorrect
        });
    };

    /* Login the user if the enter key is pressed */
    $(document).keypress(function (e) {
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
        if (firebaseUser) {
            console.log(firebaseUser.displayName + " is logged in.");
        } else {
            console.log("No one logged in.");
        }
    });
});