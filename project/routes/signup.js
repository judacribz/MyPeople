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

        user.updateProfile({
            displayName: username
        }).then(function () {
            fb.fbPushUser(user, username);
        }, function (error) {
            console.log(error);
        });


    }).catch(function (error) {
        console.log(error.message);
    });
});

module.exports = router;