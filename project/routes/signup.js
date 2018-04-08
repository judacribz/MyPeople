const fb = require("../utilities/firebase");
const firebase = fb.firebase;

const express = require('express');
var router = express.Router();

/* GET Signup page. */
router.get('/', function (req, res) {
    res.render('signup', {
        title: 'Get Started | My People'
    });
});

/* POST to Signup page */
router.post('/', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    var confirmPassword = req.body.confirmPassword;
    var auth = firebase.auth();

    /* Check if password and confirm password match */
    if (password !== confirmPassword) {
        /* Display error if passwords don't match */
        console.log("Password Invalid.");
        return;
    } else {
        /* Otherwise, add user to the database */
        auth.createUserWithEmailAndPassword(email, password).then(function (user) {
            console.log("Added to Database!");
            user.updateProfile({
                /* Update the new user profile with the display name typed in by the user */
                displayName: username
            }).then(function () {
                /* Add username to firebase database */
                fb.fbPushUser(user, username);
                /* Redirect user to login page to login */
                fb.onLoginSuccess(res, user, '/welcome');
            }, function (error) {
                console.log(error);
            });
        }).catch(function (error) {;
            /* Clear password fields, if error occurs */
            console.log(error.message);
        });
    }
});

module.exports = router;