const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res) {
	res.render('login', {
		title: 'Sign In | My People',
		message: 'Sign in to your workspace'
	});
});

/* POST to login page. */
router.post('/', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username;

	/* Handle user login */
	firebase.auth().signInWithEmailAndPassword(email, password).then(firebaseUser => {
		/* If user is successfully logged in, redirect them to the welcome page */
		fb.onLoginSuccess(res, firebaseUser, '/welcome');
	}).catch(function (error) {
		/* Display error if user login was incorrect or if user does not exist */
		console.log(error.message);
	});
});

module.exports = router;