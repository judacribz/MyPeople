var auth;

$(document).ready(function () {

    /* Handles the login */
    var login = function () {
        var email = $('#email').val();
        var password = $('#password').val();
    };

    // /* Login the user if the enter key is pressed */
    // $(document).keypress(function (e) {
    //     if (e.which == 13) {
    //         login();
    //         return false;
    //     }
    // });

    // /* Login the user if login button is clicked */
    // $('#btnLogin').click(login);

    /* Take user to sign up page if sign up link button is clicked */
    $('#btnSignUp').click(function () {
        window.location = "/signup";
    });
});