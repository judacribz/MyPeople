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


    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        res.redirect('/channel');

        /* Update the new user profile with the display name typed in by the user */
        user.updateProfile({
            displayName: username
        });

        fb.fbPushUser(user, username);
    }).catch(function (error) {
        console.log(error.message);
    });
});

module.exports = router;