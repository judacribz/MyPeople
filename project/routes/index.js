const fb = require("../utilities/firebase");
const firebase = fb.firebase;
const express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res) {
	res.render('login', {
		title: 'Sign In | My People'
	});
});

/* POST to login page. */
router.post('/', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username

	firebase.auth().signInWithEmailAndPassword(email, password).then(firebaseUser => {
		fb.onLoginSuccess(res, firebaseUser);
	}).catch(function (error) {
		console.log(error.message);
	});
});

module.exports = router;